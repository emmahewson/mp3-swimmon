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

    # Handles 'POST' method (form submission)
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
            return redirect(url_for("events"))

    # Handles 'GET' method (page load)
    return render_template("join.html")


# SIGN IN PAGE
@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():

    # Handles 'POST' method (form submission)
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

            # invalid password match
            flash("Incorrect Username and/or Password")
            return redirect(url_for("signin"))

        # if username doesn't exist
        flash("Incorrect Username and/or Password")
        return redirect(url_for("signin"))

    # Handles 'GET' method (page load)
    return render_template("sign-in.html")


# SIGN OUT
@app.route("/sign-out")
def sign_out():

    # checks if user is signed in (avoids errors)
    if "user" in session:

        # remove user from session cookies
        flash("You have been logged out")
        session.pop("user")
        return redirect(url_for("sign_in"))

    # redirects to sign in if user isn't logged in
    flash("You have to sign in before you can sign out!")
    return redirect(url_for("sign_in"))


# USER PROFILE
@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):

    # checks if user is logged in
    if "user" in session:

        # gets the user's username from the database
        username = mongo.db.users.find_one(
            {"username": session["user"]})["username"]

        # gets collections for use in event cards
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

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


# EVENTS PAGE (ALL)
@app.route("/events")
def events():

    # checks if user is logged in
    if "user" in session:

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

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


# EVENT INFO PAGE
@app.route("/event/<event_id>")
def event(event_id):

    # checks if user is logged in
    if "user" in session:
        event = mongo.db.events.find_one({"_id": ObjectId(event_id)})
        locations = list(mongo.db.locations.find())
        return render_template("event.html", event=event, locations=locations)

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


# ADD EVENT PAGE
@app.route("/add-event", methods=["GET", "POST"])
def add_event():

    # checks if user is logged in
    if "user" in session:

        # handles 'POST' method (form submission)
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

        # handles 'GET' method (page load)
        # gets collections for use in form dropdowns
        locations = list(mongo.db.locations.find())
        whos = list(mongo.db.who_for.find())
        challenges = list(mongo.db.challenge.find())
        return render_template(
            "add-event.html",
            locations=locations,
            whos=whos,
            challenges=challenges)

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


# EDIT EVENT PAGE
@app.route("/edit-event/<event_id>", methods=["GET", "POST"])
def edit_event(event_id):

    # checks if user is logged in
    if "user" in session:

        # gets event details
        event = mongo.db.events.find_one({"_id": ObjectId(event_id)})

        # checks event was created by current user or user is admin
        if session["user"] == event['created_by'] or session[
          "user"] == "admin":

            # handles 'POST' method (form submission)
            if request.method == "POST":

                # sets the event location as the location's id
                event_location = request.form.get("event_location")
                location_id = ObjectId(mongo.db.locations.find_one(
                    {"name": event_location.lower()})["_id"])

                # converts the date & time to UTC format (to order by date)
                dtstring = request.form.get(
                    "event_date") + request.form.get("event_time")
                format_data = "%d/%m/%Y%I:%M %p"
                event_date = datetime.strptime(dtstring, format_data)

                # defines new dictionary with fields to update
                submit = {
                    "name": request.form.get("event_name"),
                    "location_id": location_id,
                    "description": request.form.get("event_description"),
                    "who": request.form.get("event_who"),
                    "challenge": request.form.get("event_challenge"),
                    "date": event_date,
                }

                # updates event in database & redirects to events.html
                mongo.db.events.update_one(
                    {"_id": ObjectId(event_id)}, {"$set": submit})
                flash("Event Successfully Updated")
                return redirect(url_for("events"))

            # handles 'GET' method (page load)
            # gets collections for use in form dropdowns
            locations = list(mongo.db.locations.find())
            whos = list(mongo.db.who_for.find())
            challenges = list(mongo.db.challenge.find())
            return render_template(
                "edit-event.html",
                event=event,
                locations=locations,
                whos=whos,
                challenges=challenges)

        # if not user's event redirects to user profile page
        flash("You can only edit your own events")
        return redirect(url_for("profile", username=session["user"]))

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


@app.route("/delete-event/<event_id>")
def delete_event(event_id):

    # checks if user is logged in
    if "user" in session:

        # gets event details
        event = mongo.db.events.find_one({"_id": ObjectId(event_id)})

        # checks event was created by current user or user is admin
        if session["user"] == event['created_by'] or session[
          "user"] == "admin":

            # deletes the event and redirects to events
            mongo.db.events.delete_one({"_id": ObjectId(event_id)})
            flash("Event successfully deleted")
            return redirect(url_for("events"))

        # if not user's event redirects to user profile page
        flash("You can only delete your own events")
        return redirect(url_for("profile", username=session["user"]))

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


# MANAGE LOCATIONS PAGE
@app.route("/manage-locations")
def manage_locations():

    # checks if user is logged in
    if "user" in session:

        # checks user is admin
        if session["user"] == "admin":

            return render_template("manage-locations.html")
 
        # if not admin redirects to user profile
        flash("You do not have permission to view that page")
        return redirect(url_for("profile", username=session["user"]))

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
