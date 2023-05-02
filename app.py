import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/join", methods=["GET", "POST"])
def join():
    return render_template("join.html")


@app.route("/sign-in")
def sign_in():
    return render_template("sign-in.html")


@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route("/events")
def events():
    events = mongo.db.events.find().sort("date", 1)
    locations = list(mongo.db.locations.find())
    whos = list(mongo.db.who_for.find())
    challenges = list(mongo.db.challenge.find())
    return render_template(
        "events.html",
        events=events,
        locations=locations,
        whos=whos,
        challenges=challenges)


@app.route("/add-event")
def add_event():
    return render_template("add-event.html")


@app.route("/manage-locations")
def manage_locations():
    return render_template("manage-locations.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
