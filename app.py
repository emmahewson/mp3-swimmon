import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for, jsonify, abort)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from urllib.parse import urlparse, urlsplit
import cloudinary
import cloudinary.uploader
import cloudinary.api
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")
app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.jpeg', '.heic']

mongo = PyMongo(app)

# retrieves the hidden env variable for cloudinary API
cloudinary.config(cloud_name=os.environ.get('CLOUD_NAME'),
                  api_key=os.environ.get('CLOUD_API_KEY'),
                  api_secret=os.environ.get('CLOUD_API_SECRET'))


@app.route("/")
def home():
    '''
    Renders home page template
    '''
    # gets location collection
    return render_template("index.html")


@app.route('/fetch')
def fetch():
    '''
    Fetch function allows GoogleMaps API to operate with data from MongoDB
    Converts the locations collection to a JSON file
    Adapted from SagaCity project by Lee Martina
    https://github.com/isntlee/Sagacity/blob/master/templates/home.html
    '''
    if request.method == "GET":
        locations = mongo.db.locations.find()
        locationList = []
        for location in locations:
            location['_id'] = str(location['_id'])
            locationList.append(location)
        return jsonify(locationList)


@app.route("/join", methods=["GET", "POST"])
def join():
    '''
    Renders the join / register page template
    Allows users to set up an account
    Checks if username already exists
    '''

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


@app.route("/sign-in", methods=["GET", "POST"])
def sign_in():
    '''
    Renders the sign in page template
    Allows registered users to sign in to their account
    Adds user to session cookie
    Redirects to user profile
    '''

    # Handles 'POST' method (form submission)
    if request.method == "POST":
        # check if username exists
        existing_user = mongo.db.users.find_one(
            {"username": request.form.get("username").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(
                existing_user["password"], request.form.get(
                    "password")):
                session["user"] = request.form.get("username").lower()
                flash("Welcome, {}".format(request.form.get("username")))

                # redirects user to previous page if stored in session
                if 'url' in session:
                    return redirect(session['url'])
                return redirect(
                    url_for("my_profile", username=session["user"]))

            # invalid password match
            flash("Incorrect Username and/or Password")
            return redirect(url_for("signin"))

        # if username doesn't exist
        flash("Incorrect Username and/or Password")
        return redirect(url_for("signin"))

    # Handles 'GET' method (page load)
    return render_template("sign-in.html")


@app.route("/sign-out")
def sign_out():
    '''
    Signs user out of their account
    Removes logged in user from session cookie
    Redirects to sign-in page
    Checks if user is logged in to avoid errors
    '''

    # checks if user is signed in (avoids errors)
    if "user" in session:

        # remove user from session cookies
        flash("You have been logged out")
        session.pop("user")
        session.pop("url")
        return redirect(url_for("sign_in"))

    # redirects to sign in if user isn't logged in
    flash("You have to sign in before you can sign out!")
    return redirect(url_for("sign_in"))


# USER PROFILE
@app.route("/my-profile/<username>", methods=["GET", "POST"])
def my_profile(username):
    '''
    Security: logged-in users only
    Renders the user's profile page
    Send current user's username
    Sends filtered collection of events created by current user
    Sorts filtered events collection by date
    Sends locations collection for location info
    '''

    # checks if user is logged in
    if "user" in session:

        # gets the user's username from the database
        username = mongo.db.users.find_one(
            {"username": session["user"]})["username"]

        # checks if a result was found if not aborts and routes to 404
        if type(username) is not None:

            # stores url in session to redirect after edit event
            session['url'] = url_for("my_profile", username=username)

            # gets collections for use in event cards
            # gets events, filters by current user & today onwards
            # sorts by date
            events = mongo.db.events.find({
                "created_by": username.lower(),
                "date": {"$gte": datetime.now()}
                }).sort("date", 1)
            locations = list(mongo.db.locations.find())

            return render_template(
                "my-profile.html",
                username=username,
                events=events,
                locations=locations)

        # if no result found routes to 404 page
        return abort(404)

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


@app.route("/events")
def events():
    '''
    Security: logged-in users only
    Renders the events page (all events)
    Sends events collection (sorted by date)
    Sends locations, challenge & whos collections for info & filtering
    '''

    # stores url in session to redirect after sign in / edit
    session['url'] = url_for("events")

    # checks if user is logged in
    if "user" in session:

        # gets events, filters by today onwards, sorts by date
        events = mongo.db.events.find(
            {"date": {"$gte": datetime.now()}}).sort("date", 1)

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


@app.route("/event/<event_id>")
def event(event_id):
    '''
    Security: logged-in users only
    Renders event page based on event_id
    Finds correct event using event id
    Sends locations collection for location info
    '''

    # grabs event id from url for redirect
    url_id = request.path.split("/")[-1]
    # stores url in session to redirect after sign in / edit
    session['url'] = url_for("event", event_id=url_id)

    # checks if user is logged in
    if "user" in session:

        event = mongo.db.events.find_one({"_id": ObjectId(event_id)})

        # checks if a result was found if not aborts and routes to 404
        if event is not None:
            locations = list(mongo.db.locations.find())
            return render_template(
                "event.html", event=event,
                locations=locations
            )

        # if no result found routes to 404 page
        return abort(404)

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


@app.route("/add-event", methods=["GET", "POST"])
def add_event():
    '''
    Security: logged-in users only
    Renders the add-event page form
    Sends locations, whos & challenges collections for form dropdowns
    Handles the add event form submission
    Creates a new event in the events collection
    '''

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
    # stores url in session to redirect after sign in
    session['url'] = url_for("add_event")
    return redirect(url_for("sign_in"))


@app.route("/edit-event/<event_id>", methods=["GET", "POST"])
def edit_event(event_id):
    '''
    Security: logged-in users only
    Security: only admin & event creator can edit
    Renders the edit-event page form
    Form populated by event info based on event_id
    Sends locations, whos & challenges collections for form dropdowns
    Handles the edit event form submission
    Updates event in events collection
    '''

    # grabs event id from url for redirect
    url_id = request.path.split("/")[-1]

    # checks if user is logged in
    if "user" in session:

        # gets event details
        event = mongo.db.events.find_one({"_id": ObjectId(event_id)})

        # checks if a result was found if not aborts and routes to 404
        if event is not None:

            # checks event was created by current user or user is admin
            if (
                session["user"] == event['created_by'] or
                session["user"] == "admin"
            ):
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

                    # updates event in database
                    mongo.db.events.update_one(
                        {"_id": ObjectId(event_id)}, {"$set": submit})

                    # Handles redirect & user message
                    flash("Event Successfully Updated")
                    # redirects user to prev. page if a url in session
                    # checks that stored url isn't this page (login redirect)
                    if (
                        'url' in session and
                        session['url'] != url_for(
                            "edit_event",
                            event_id=url_id
                        )
                    ):
                        return redirect(session['url'])
                    # redirects to events if url not stored or url is this page
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
            return redirect(url_for("my_profile", username=session["user"]))

        # if no result found routes to 404 page
        return abort(404)

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    # stores url in session to redirect after sign in
    session['url'] = url_for("edit_event", event_id=url_id)
    return redirect(url_for("sign_in"))


@app.route("/delete-event/<event_id>")
def delete_event(event_id):
    '''
    Security: logged-in users only
    Security: only admin & event creator can delete
    Deletes event from events collection based on event_id
    '''

    # checks if user is logged in
    if "user" in session:

        # gets event details
        event = mongo.db.events.find_one({"_id": ObjectId(event_id)})

        # checks if a result was found if not aborts and routes to 404
        if event is not None:

            # checks event was created by current user or user is admin
            if (
                session["user"] == event['created_by'] or
                session["user"] == "admin"
            ):
                # deletes the event and redirects to events
                mongo.db.events.delete_one({"_id": ObjectId(event_id)})
                flash("Event successfully deleted")
                # redirects user to previous page if a url is stored in session
                # checks that stored url isn't this page (login redirect)
                if (
                    'url' in session and
                    session['url'] != url_for("event", event_id=event_id)
                ):
                    return redirect(session['url'])
                # redirects to events if url not stored
                # or url is for the deleted event page
                return redirect(url_for("events"))

            # if not user's event redirects to user profile page
            flash("You can only delete your own events")
            return redirect(url_for("my_profile", username=session["user"]))

        # if no result found routes to 404 page
        return abort(404)

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    # stores url for events page for redirect after sign in
    # avoids user triggering to 'delete' functionality on sign in
    session['url'] = url_for("events")
    return redirect(url_for("sign_in"))


@app.route("/manage-locations")
def manage_locations():
    '''
    Security: admin only
    Renders the manage locations page
    Sends location collection
    '''

    # stores url in session to redirect after sign in / edit location
    session['url'] = url_for("manage_locations")

    # checks if user is logged in
    if "user" in session:

        # checks user is admin
        if session["user"] == "admin":

            locations = mongo.db.locations.find()
            return render_template(
                "manage-locations.html",
                locations=locations)

        # if not admin redirects to user profile
        flash("You do not have permission to view that page")
        return redirect(url_for("my_profile", username=session["user"]))

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    return redirect(url_for("sign_in"))


@app.route("/location/<location_id>")
def location(location_id):
    '''
    Security: admin users only
    Renders location page based on location_id
    Finds correct location using location_id
    Filters events collection by correct location_id for event cards
    Sends locations collection for location info on event cards
    '''

    location = mongo.db.locations.find_one({"_id": ObjectId(location_id)})

    # checks if a result was found if not aborts and routes to 404
    if location is not None:

        # filters events by location, filters by today onwards, sorts by date
        events = mongo.db.events.find({
            "location_id": ObjectId(location_id),
            "date": {"$gte": datetime.now()}
            }).sort("date", 1)
        locations = list(mongo.db.locations.find())

        # grabs location id from url for redirect
        url_id = request.path.split("/")[-1]
        # stores url in session to redirect after edit location
        session['url'] = url_for("location", location_id=url_id)

        return render_template(
            "location.html",
            events=events,
            locations=locations,
            location=location
        )

    # if no result found routes to 404 page
    return abort(404)


# Adapted from https://github.com/kairosity/mp3-snapathon/tree/master
# by Karina Finegan
def check_image_size(image):
    '''
    Checks an image is less than 5MB
    Helper Function for location image upload
    '''
    image.seek(0, os.SEEK_END)
    image_size = image.tell()
    image.seek(0, 0)

    if image_size > 5000000:
        return abort(413)
    else:
        return True


@app.route("/add-location", methods=["GET", "POST"])
def add_location():
    '''
    Security: admin only
    Renders the add-location page form
    Handles the add location form submission
    Creates a new location in the locations collection
    '''
    # checks if user is logged in
    if "user" in session:

        # checks user is admin
        if session["user"] == "admin":

            # handles 'POST' method (form submission)
            if request.method == "POST":

                # get the uploaded image from the form
                image = request.files['image_upload']

                # checks the image is under 5MB
                # if not aborts & redirects to custom 413 error page
                check_image_size(image)

                # checks if the image file type is accepted
                # if not aborts & redirects to custom 415 error page
                # Adapted from project by Karina Finegan
                # https://github.com/kairosity/mp3-snapathon/tree/master
                file_extension = os.path.splitext(image.filename)[1]
                if file_extension not in app.config['UPLOAD_EXTENSIONS']:
                    abort(415)

                # uploads the image to cloudinary
                image_upload = cloudinary.uploader.upload(image)

                # defines new location dictionary
                location = {
                    "name": request.form.get("location_name").lower(),
                    "lat": request.form.get("latitude"),
                    "long": request.form.get("longitude"),
                    "description": request.form.get("location_description"),
                    "facilities": request.form.get("location_facilities"),
                    "parking": request.form.get("location_parking"),
                    "image_url": image_upload["secure_url"]
                }

                # adds event to collection & redirects to events.html
                mongo.db.locations.insert_one(location)
                flash("Location Successfully Added")
                return redirect(url_for("manage_locations"))

            # handles 'GET' method (page load)
            locations = mongo.db.locations.find()
            return render_template("add-location.html", locations=locations)

        # if not admin redirects to user profile
        flash("You do not have permission to view that page")
        return redirect(url_for("my_profile", username=session["user"]))

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    # stores url in session to redirect after sign in
    session['url'] = url_for("add_location")
    return redirect(url_for("sign_in"))


@app.route("/edit-location/<location_id>", methods=["GET", "POST"])
def edit_location(location_id):
    '''
    Security: admin only
    Renders the edit-location page form
    Form populated by location info based on location_id
    Handles the edit location form submission
    Updates location in locations collection
    '''

    # grabs event id from url for redirect
    url_id = request.path.split("/")[-1]

    # checks if user is logged in
    if "user" in session:

        # checks current user is admin
        if session["user"] == "admin":

            location = mongo.db.locations.find_one(
                {"_id": ObjectId(location_id)})

            # checks if a result was found if not aborts and routes to 404
            if location is not None:

                # handles 'POST' method (form submission)
                if request.method == "POST":

                    # gets the uploaded image from the form
                    image = request.files['image_upload']

                    # gets the old image url from the database
                    old_image = location["image_url"]

                    # checks if an image has been uploaded
                    if image:

                        # checks the image is under 5MB
                        # if not aborts & redirects to custom 413 error page
                        check_image_size(image)

                        # checks if the image file type is accepted
                        # if not aborts & redirects to custom 415 error page
                        # Adapted from project by Karina Finegan
                        # https://github.com/kairosity/mp3-snapathon/tree/master
                        file_extension = os.path.splitext(image.filename)[1]
                        if (
                            file_extension not in app.config[
                                'UPLOAD_EXTENSIONS']
                        ):
                            abort(415)

                        # uploads image image to Cloudinary
                        image_upload = cloudinary.uploader.upload(image)

                        # sets value for database to the new image's URL
                        updated_image_url = image_upload["secure_url"]

                    # if no image uploaded
                    else:

                        # sets value for database to the old image's URL
                        updated_image_url = old_image

                    submit = {
                            "name": request.form.get(
                                "location_name").lower(),
                            "lat": request.form.get(
                                "latitude"),
                            "long": request.form.get(
                                "longitude"),
                            "description": request.form.get(
                                "location_description"),
                            "facilities": request.form.get(
                                "location_facilities"),
                            "parking": request.form.get(
                                "location_parking"),
                            "image_url": updated_image_url
                        }

                    # updates location in database
                    mongo.db.locations.update_one(
                        {"_id": ObjectId(location_id)}, {"$set": submit})

                    # Handles redirect / user message
                    flash("Location Successfully Updated")
                    # redirects user to prev. page if a url is in session
                    # checks that stored url isn't this page (login redirect)
                    if (
                        'url' in session and
                        session['url'] != url_for(
                            "edit_location", location_id=url_id)
                    ):
                        return redirect(session['url'])
                    # default redirect if no url stored or url is this page
                    return redirect(url_for("manage_locations"))

                # handles 'GET' method (page load)
                # gets event details
                return render_template("edit-location.html", location=location)

            # if no result found routes to 404 page
            return abort(404)

        # if not user's event redirects to user profile page
        flash("You do not have permission to edit locations")
        return redirect(url_for("my_profile", username=session["user"]))

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    # stores url in session to redirect after sign in
    session['url'] = url_for("edit_location", location_id=url_id)
    return redirect(url_for("sign_in"))


@app.route("/delete-location/<location_id>")
def delete_location(location_id):
    '''
    Security: admin only
    Deletes location from locations collection based on location_id
    '''

    # checks if user is logged in
    if "user" in session:

        # checks current user is admin
        if session["user"] == "admin":

            location = mongo.db.locations.find_one(
                {"_id": ObjectId(location_id)}
            )

            # checks if a result was found if not aborts and routes to 404
            if location is not None:

                # deletes events at that location
                mongo.db.events.delete_many(
                    {"location_id": ObjectId(location_id)}
                )
                # deletes the location and redirects to manage locations
                mongo.db.locations.delete_one({"_id": ObjectId(location_id)})
                flash("Location successfully deleted")
                return redirect(url_for("manage_locations"))

            # if no result found routes to 404 page
            return abort(404)

        # if not user's event redirects to user profile page
        flash("You do not have permission to delete locations")
        return redirect(url_for("my_profile", username=session["user"]))

    # redirects to sign in if user isn't logged in
    flash("You must be signed in to view that page")
    # stores url for manage_locations page for redirect after sign in
    # avoids user triggering to 'delete' functionality on sign in
    session['url'] = url_for("manage_locations")
    return redirect(url_for("sign_in"))


@app.errorhandler(404)
def page_not_found(error):
    '''
    Route to handle 404 error
    Renders custom 404 page
    '''
    return render_template("404.html", error=error), 404


@app.errorhandler(413)
def image_too_large(error):
    '''
    Route to handle 413 error
    Renders custom 413 page
    '''
    return render_template("413.html", error=error), 413


@app.errorhandler(415)
def unsupported_media_type(error):
    '''
    Route to handle 415 error
    Renders custom 415 page
    '''
    return render_template("415.html", error=error), 415


@app.errorhandler(500)
def internal_error(error):
    '''
    Route to handle 500 error
    Renders custom 500 page
    '''
    return render_template("500.html", error=error), 500


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
