import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


# HOME PAGE
@app.route("/")
def home():
    return render_template("index.html")


# JOIN (REGISTER) PAGE
@app.route("/join", methods=["GET", "POST"])
def join():
    if request.method == "POST":
        # check if username already exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("join"))

        # checks if the passwords match
        password_one = request.form.get("password")
        password_two = request.form.get("password-confirm")

        if password_one != password_two:
            flash("Passwords don't match - try again")
            return redirect(url_for("join"))

        elif password_one == password_two:
            new_user = {
                "username": request.form.get("username").lower(),
                "password": generate_password_hash(
                    request.form.get("password"))
            }
            mongo.db.users.insert_one(new_user)

            # put the new user in to 'session' cookie
            session["user"] = request.form.get("username").lower()
            flash("Registration Successful")

    return render_template("join.html")


# SIGN IN PAGE
@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
    if request.method == "POST":
        # check if username exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hased password matches user input
            if check_password_hash(
                existing_user["password"], request.form.get(
                    "password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome, {}".format(request.form.get("username")))
                return redirect(url_for("profile", username=session["user"]))
            else:
                # invalid password match
                flash("Incorrect Username and/or Password")
                return redirect(url_for("signin"))

        else:
            # if username doesn't exist
            flash("Incorrect Username and/or Password")
            return redirect(url_for("signin"))

    return render_template("sign-in.html")


# SIGN OUT
@app.route("/sign-out")
def sign_out():
    # remove user from session cookies
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("sign_in"))


# USER PROFILE
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    # gets the user's username from the database
    username = mongo.db.users.find_one(
        {"username": session["user"]})["username"]

    # checks if user is logged in to view their profile
    if session["user"]:
        events = mongo.db.events.find().sort("date", 1)
        locations = list(mongo.db.locations.find())
        whos = list(mongo.db.who_for.find())
        challenges = list(mongo.db.challenge.find())
        return render_template(
            "profile.html",
            username=username,
            events=events,
            locations=locations,
            whos=whos,
            challenges=challenges)

    return redirect(url_for("signin"))


# EVENTS PAGE (ALL)
@app.route("/events")
def events():

    # sorts events by date
    events = mongo.db.events.find().sort("date", 1)

    # gets collections as lists for search filters
    locations = list(mongo.db.locations.find())
    whos = list(mongo.db.who_for.find())
    challenges = list(mongo.db.challenge.find())

    return render_template(
        "events.html",
        events=events,
        locations=locations,
        whos=whos,
        challenges=challenges)


# EVENT INFO PAGE
@app.route("/event/<event_id>")
def event(event_id):
    event = mongo.db.events.find_one({"_id": ObjectId(event_id)})
    locations = list(mongo.db.locations.find())
    return render_template("event.html", event=event, locations=locations)


# ADD EVENT FORM PAGE
@app.route("/add-event", methods=["GET", "POST"])
def add_event():
    if request.method == "POST":

        # sets the event location as the location's id
        event_location = request.form.get("event_location")
        location_id = ObjectId(mongo.db.locations.find_one(
            {'name': event_location.lower()})["_id"])

        # converts the date & time to UTC format (for sorting)
        dtstring = request.form.get(
            "event_date") + request.form.get("event_time")
        format_data = "%d/%m/%Y%I:%M %p"
        event_date = datetime.strptime(dtstring, format_data)

        # defines new event dictionary
        event = {
            "name": request.form.get("event_name"),
            "location_id": location_id,
            "description": request.form.get("event_description"),
            "who": request.form.get("event_who"),
            "challenge": request.form.get("event_challenge"),
            "created_by": session["user"],
            "date": event_date,
        }

        # adds event to collection & redirects to events.html
        mongo.db.events.insert_one(event)
        flash("Event Successfully Added")
        print(dtstring)
        return redirect(url_for("events"))

    # gets collections for use in form dropdowns
    locations = list(mongo.db.locations.find())
    whos = list(mongo.db.who_for.find())
    challenges = list(mongo.db.challenge.find())
    return render_template(
        "add-event.html",
        locations=locations,
        whos=whos,
        challenges=challenges)


# MANAGER LOCATIONS PAGE
@app.route("/manage-locations")
def manage_locations():
    return render_template("manage-locations.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
