# SWIMMÔN Wild Swimming Events Website

SWIMMÔN is a website for swimmers on The Isle of Anglesey / Ynys Môn to find and set up wild swimming meet ups around the island. The live Website can be found [here](https://swim-mon.herokuapp.com/).

![Mockup]()
****
## Table of Contents

* [User Experience Design (UX)](#User-Experience-Design)
    * [The Strategy Plane](#The-Strategy-Plane)
        * [Site Goals](#Site-Goals)
        * [User stories](#User-Stories)
    * [The Scope Plane](#The-Scope-Plane)
    * [The Structure Plane](#The-Structure-Plane)
    * [The Skeleton Plane](#The-Skeleton-Plane)
        * [Wireframes](#Wireframes)
        * [Database Design](#Database-Design)
        * [Security](#Security)
    * [The Surface Plane](#The-Surface-Plane)
        * [Design](#Design)
            * [Colour Scheme](#Colour-Scheme)
            * [Typography](#Typography)
            * [Imagery](#Imagery)
    * [Differences to Design](#Differences-to-Design)
- [Features](#Features)
    * [Current Features](#Current-Features)
    * [Future Features](#Features-Left-to-Implement)
* [Technologies](#Technologies)
* [Testing](#Testing)
    * [Test Strategy](#Test-Strategy)
    * [Test Results](#Test-Results)
    * [Isses and Resolutions](#Issues-and-Resolutions-to-issues-found-during-testing)
* [Deployment](#Deployment)
    * [Project Creation](#Project-Creation)
    * [GitHub Pages](#Deployment-To-Heroku)
    * [Run Locally](#Run-Locally)
    * [Fork Project](#Fork-Project)
* [Credits](#Credits)
  * [Content](#Content)
  * [Acknowledgements](#Acknowledgements)


****

## User Experience Design
### **The Strategy Plane**



#### Site Goals
* Goal 1
* Goal 2

#### User stories
* As a user:
    * I want to be able to find what I need immediately and for the navigation to be easy to follow & intuitive
    * I want to be able to view the site on any device and for it to be fully responsive
    * I want to be able to contact the site to suggest additional swim locations or ask questions
    * As a user, I want to be able to return to the main site without having to use the browser buttons if I end up on a non-existent page
* As a user without an account:
    * I want to understand the purpose of the site immediately upon entering
    * I want to be able to view information about places to go wild swimming on Anglesey
    * I want to be able to set up an account so that I can view and create events
* As a user with an account:
    * I want to be able to sign in to my account
    * I want to be able to browse wild swimming events and find all the information I need to join one
    * I want to be able to search & filter wild swimming events to find one that suits me
    * I want to be able to set up a new event
    * I want to be able to view, edit and delete the events I have set up
    * I want to be able to log out of my account easily
* As an admin of the site:
    * I want to be able to add, edit or delete swimming locations for members to choose between for their event
    * I want to be able to edit or delete events created by other users for site management purposes


****
### **The Scope Plane**

**Features planned:**
* General
    * Responsive design
    * MongoDB databases to store location, event, event categorisation (challenge level & who-for) & user information
* All users (no log in required)
    * Navigation
    * Home page with explanatory text & list of locations for swimming
        * Google Maps API with clickable location links
    * Location page with detailed location information
    * Sign in functionality
    * Sign up functionality
    * Custom 404 Page
* Signed in (registered users)
    * Sign out functionality
    * Profile Page with user's own events (with CRUD functionality links)
    * Events page with all events (summary only) and search/filter functionality
    * Event page with full event information (with CRUD functionality links for user's own events)
    * Add event functionality
    * Edit / Delete event functionality for user's own events
* Admin only
    * Manage locations page (with CRUD functionality links)
    * Add / Edit / Delete location functionality
    * Edit / Delete other users' events

The table shows the importance and difficulty of these features - I will prioritise them based on this during the development process.


| **User** | **Feature** | **Difficulty** | **Importance** |
|-------------|------------|------------|------------|
| General | Responsive Design | 2 | 5 |
| General | MongoDB database to store required data | 5 | 5 |
| All Users | Navigation | 1 | 5 |
| All Users | Home Page - branding & Explanatory Text | 1 | 5 |
| All Users | Home Page - list of swimming locations on map (Google Maps API) with clickable markers | 5 | 1 |
| All Users | Individual Location Info page | 5 | 1 |
| All Users | Sign In Functionality | 5 | 5 |
| All Users | Sign Up Functionality | 5 | 5 |
| All Users | Custom 404 Page | 1 | 4 |
| Signed In | Sign Out Functionality | 5 | 5 |
| Signed In | Profile Page with user's own events | 4 | 3 |
| Signed In | Events Page with summary info of all events | 4 | 5 |
| Signed In | Event Page with full info & CRUD functionality links for user's own events | 5 | 5 |
| Signed In | Add Event functionality | 5 | 5 |
| Signed In | Edit / Delete functionality for user's own events | 5 | 5 |
| Admin Only | Manage Locations Page (with CRUD functionality links) | 4 | 3 |
| Admin Only | Add / Edit / Delete location functionality | 5 | 3 |
| Admin Only | Edit / Delete other users' events | 3 | 3 |

****
### **The Structure Plane**
Based on the features and the user stories I developed a flow chart for the site

![Site Flow Chart](readme-images/planning/planning_flow_diagram.jpg)


This site structure targets the user stories as follows:

User Story:
> I want to be able to find what I need immediately and for the navigation to be easy to follow & intuitive

Implementation:
* Navigation menu to be displayed on all pages with relevant nav links (change based on whether user is registered / admin)
* All navigation links go to the correct pages
* User is led through site in an intuitive way
    * Locations page links to individual location pages
    * Events page links to individual event pages
    * Sign in leads to user profile
    * All main functionality visible in nav when required e.g. (add event, log out, management locations)

The following navigation links will be included in the site
* Home (index.html)
* Events (events.html)
* Add Event (add-event.html)
* Manage Locations (manage-locations.html)
* Account - Dropdown List
    * Join (join.html)
    * Sign In (sign-in.html)
    * Profile (profile.html)
    * Sign Out (redirects to home page)

These nav links will be displayed based on who the user is and whether they're logged in:

| **Logged Out** | **Logged In (non-admin)** | **Logged In (admin)** |
|-------------|------------|------------|
| Home | Home | Home |
| --- | Events | Events |
| --- | Add Event | Add Event |
| --- | --- | Manage Locations |
| Join | --- | --- |
| Sign In | --- | --- |
| --- | Profile | Profile |
| --- | Sign Out | Sign Out |


User Story:
> I want to be able to view the site on any device and for it to be fully responsive

Implementation:
* The site will be built using a combination of Materialize and custom CSS and fully tested during and after development to make sure it is fully responsive on different size devices.

User Story:
> I want to be able to contact the site to suggest additional swim locations or ask questions

Implementation:
* The site footer will contain a link to an email address for the user to contact the site admins. There will also be an email link for a user to suggest a new location when filling in the 'add event' form in a popover element. This will help explain to the user that only approved locations are allowed for events and give them an option to get in touch should they wish to make a suggestion for an additional location.

User Story:
> As a user, I want to be able to return to the main site without having to use the browser buttons if I end up on a non-existent page

Implementation:
* A custom 404 page will be created which will include the main navigation bar and footer so that the user can navigate back to the relevant page without using the browser back button.

User Story:
> As a user without an account, I want to understand the purpose of the site immediately upon entering

Implementation:
* The Home page will include some explanatory text about the site and its purpose. All pages will include the site logo within the navbar which will also be a clickable link back to the homepage. There will also be an eye-catching hero text box with a relevant image at the top of the home page more text to reinforce the purpose of the site.

User Story:
> As a user without an account, I want to be able to view information about places to go wild swimming on Anglesey

Implementation:
* The Home page will contain information about swimming locations on Anglesey with clickable links to a page which contains more detailed information about that location. If time allows this information will be displayed on a map using Google Maps API and clickable cluster markers with pop up summary boxes.

User Story:
> As a user without an account, I want to be able to set up an account so that I can view and create events

Implementation:
* The nav bar will contain a dropdown called "account" which will contain a link for user to 'join'. There will also be a clickable button on the homepage as a call to action to guide users to the join page. Both of these will only be visible to users who are not logged in.


User Story:
> As a user with an account, I want to be able to sign in to my account
* The nav bar will contain a dropdown called "account" which will contain a link for user to 'sign in'. There will also be a text link on the homepage as a call to action to guide users to the siggin. Both of these will only be visible to users who are not logged in.

User Story:
> As a user with an account, I want to be able to browse wild swimming events and find all the information I need to join one

Implementation
* The events page will contain summary boxes containing basic information about all the upcoming events. These boxes will be clickable to take the user to a page about that event containing more detailed information about the event and the location.

User Story:
> As a user with an account, I want to be able to search & filter wild swimming events to find one that suits me

Implementation
* The event summary boxes on the events page will be searchable / filterable by location, who they are for (women, men, all) and challenge level (fun, intermediate, challenging.) All of this information will have been selected by the user when creating the event and contained within the database.

User Story:
> As a user with an account, I want to be able to set up a new event

Implementation
* The nav bar will contain a link to 'add event' as well as call to action links/buttons on the home page (for logged in users), the events page, the location info page & the user profile page. These will take the user to a form to fill in with details of their event.
* The form will contain the following fields:
    * Event name (text)
    * Location (dropdown with list of admin created locations)
    * Event description (textarea)
    * Date (date picker)
    * Time (time picker)
    * Who For (dropdown with list of options - women-only, men-only, all-welcome)
    * Challenge Level (dropdown with list of options - fun, intermediate, challenging)
* Upon submission this event will appear in the events page, the user's profile page & on the relevant location's page

User Story:
> As a user with an account, I want to be able to view, edit and delete the events I have set up

Implementation
* The user will be able to view the events they have created on their profile page, on the main events page and in the location page (with events for that location). The user's events will have buttons to edit & delete, both on the summary boxes and in the event's full page. 
    * Edit: The edit button will take the user to a pre-filled form containing the event information which will be ediable.
    * Delete: The delete button will trigger a warning to the user before they delete it. This functionality will only be available to the user who created the event and the admin.

User Story:
> As a user with an account, I want to be able to log out of my account easily

Implementation
* The navigation will contain an 'account' dropdown containing a link for the user to signout which will log the user out and return them to the home page.

User Story:
> As an admin of the site, I want to be able to add, edit or delete swimming locations for members to choose between for their event

Implementation
* The admin will have a page visible only to them, accessible from the main nav bar, to manage locations, which will list all the locations with clickable links to view the location information as well as buttons to edit & delete that location.
    * Add: There will be an add location button which will take the admin to a form to add a new location which contain the following fields:
        * Location Name (text)
        * Latitude & Longitude (with an explanatory popover box to guide the admin on how to access this information & the correct format)
        * Location Description (textarea)
        * Parking Description (textarea)
        * Facililties Description (textarea)
        * Image URL (with an explanatory popover box to guide the admin on how to find and input)
    * Edit: The location boxes will have an edit button which will take the admin to a pre-filled form containing the location information which will be editable.
    * Delete: The location boxes will have a delete button which will trigger a warning to the admin before they delete it.


    TBC - WHAT HAPPENS TO ASSOCIATED EVENTS?!


User Story:
> As an admin of the site, I want to be able to edit or delete events created by other users for site management purposes

Implementation
* The admin will be able to edit or delete events created by any user both in the event summary boxes and on the event page.

****
### **The Skeleton Plane**
[For wireframes see Surface Plane](#wireframes)

#### Database Design
MongoDB Object format examples:

**Collection: events**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;_id : unique-value,<br>
&nbsp;&nbsp;&nbsp;&nbsp;name : "Sunday Swim",<br>
&nbsp;&nbsp;&nbsp;&nbsp;description : "A relaxed dip with friendly people to get our Sundays off to a good start.",<br>
&nbsp;&nbsp;&nbsp;&nbsp;date-time : "2023-06-13T10:00:00.000+00:00",<br>
&nbsp;&nbsp;&nbsp;&nbsp;location_id : (location-id),<br>
&nbsp;&nbsp;&nbsp;&nbsp;challenge : "fun",<br>
&nbsp;&nbsp;&nbsp;&nbsp;who : "All-Welcome",<br>
&nbsp;&nbsp;&nbsp;&nbsp;created-by : session[user],<br>
}

**Collection: locations**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;_id : unique-value,<br>
&nbsp;&nbsp;&nbsp;&nbsp;name : "Llanddwyn",<br>
&nbsp;&nbsp;&nbsp;&nbsp;latitude : "53.14466044027234",<br>
&nbsp;&nbsp;&nbsp;&nbsp;latitude : "-4.385204789999572",<br>
&nbsp;&nbsp;&nbsp;&nbsp;description : "A large sandy beach with beautiful views of the mountains",<br>
&nbsp;&nbsp;&nbsp;&nbsp;parking : "Paid parking available on an hourly basis. Pay on exit. Height restriction of 2.1m.",<br>
&nbsp;&nbsp;&nbsp;&nbsp;facilities : "Toilets open from sunrise until sunset. On site freshwater outdoor shower. Food & drink vans.",<br>
&nbsp;&nbsp;&nbsp;&nbsp;image_url : "https://www.fotovue.com/wp-content/uploads/2016/10/IMGP1890-scaled.jpg"<br>
}

**Collection: users**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;_id: unique-value,<br>
&nbsp;&nbsp;&nbsp;&nbsp;username: "Admin",<br>
&nbsp;&nbsp;&nbsp;&nbsp;password : "ab123bn548",<br>
}

**Collection: who_for**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;_id: unique-value,<br>
&nbsp;&nbsp;&nbsp;&nbsp;name: "Women-Only",<br>
}

**Collection: challenge**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;_id: unique-value,<br>
&nbsp;&nbsp;&nbsp;&nbsp;name: "Intermediate",<br>
}

#### Security

Database connection details are set up in an [env.py](https://pypi.org/project/env.py/) for development, for 
security reasons this is not uploaded to GitHub so that database and connection details are not visible to 
users. In production these are stored in Heroku. 

****
### **The Surface Plane**
#### Wireframes

I created fully designed wireframes in [Figma](https://www.figma.com/). This allows me to make all major design decisions including colours, fonts, layout, spacing and the visual user experience before commencing coding.

**Wireframes / Site Design**

* [Home]()
* [Join]()
* [Sign In]()
* [Profile]()
* [Events]()
* [Event Page]()
* [Add Event]()
* [Edit Event]()
* [Location Page]()
* [Manage Locations]()
* [Add Location]()
* [Edit Location]()


### Design

#### Colour Scheme


#### Typography

****
## Differences to Design

****
## Features

### Existing Features


### Future Features

****
## Technologies
* [HTML](https://en.wikipedia.org/wiki/HTML)
	* This project uses HTML as the main language used to complete the structure of the Website.
* [CSS](https://en.wikipedia.org/wiki/CSS)
	* This project uses custom written CSS to style the Website.
* [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
    * JavaScript is used along with [emailjs](https://www.emailjs.com/) for the contact form. This sends an email to the owner
    on form submit.
    * [jQuery](https://jquery.com/) is used for the following: 
        * Mobile side nav
        * Displaying Success/Fail message verifying contact form status.
        * Collapsible Materialize elements.
        * Materialize modal.
        * Datepicker functionality on forms.
        * To populate downdrops on select elements.
* [Python](https://www.python.org/)
    * This projects core was created using Python, the back-end logic and the means to run/view the Website.
    * Python Modules used (These can be found in the requirements.txt project file):
        * dnspython==2.0.0
        * Flask==1.1.2
        * Flask-PyMongo==2.3.0
        * Flask-WTF==0.14.3
        * itsdangerous==1.1.0
        * pymongo==3.11.2
        * Werkzeug==1.0.1
        * WTForms==2.3.3
* [MongoDB](https://www.mongodb.com/1)
    * MongoDB was used to create the document based databases(collections) used as data storage for this project.
* [Materialize](https://materializecss.com/)
    * The Materialize framework was used through the website for layout and responsiveness.
* [Google Fonts](https://fonts.google.com/)
	* Google fonts are used throughout the project to import the *Inter* and *Bevan* fonts.
* [GitHub](https://github.com/)
	* GithHub is the hosting site used to store the source code for the Website.
* [Git](https://git-scm.com/)
	* Git is used as version control software to commit and push code to the GitHub repository where the source code is stored.
* [Heroku](https://dashboard.heroku.com/apps)
    * Heroku was used to deploy the live website.
* [TinyJPG](https://tinyjpg.com/)
	* TinyJPG/TinyPNG is used to reduce the file sizes of images before being deployed to reduce storage and bandwith.
* [Google Chrome Developer Tools](https://developers.google.com/web/tools/chrome-devtools)
	* Google chromes built in developer tools are used to inspect page elements and help debug issues with the site layout and test different CSS styles.
* [balsamiq Wireframes](https://balsamiq.com/wireframes/)
	* This was used to create wireframes for 'The Skeleton Plane' stage of UX design.
* [Canva](https://www.canva.com/)
    * Canva design was used in order to create the website logo.
* [Font Awesome](https://fontawesome.com/)
    * All the Icons displayed throughout the website are Font Awesome icons.
* [Favicon](https://favicon.io/)
    * Favicon.io was used to make the site favicon 
* [Techsini](http://techsini.com/multi-mockup/index.php)
    * Multi Device Website Mockup Generator was used to create the Mock up image in this README

****
## Testing

****
## Deployment


### Deployment to Heroku

**Create application:**
1. Navigate to Heroku.com and login.
1. Click on the new button.
1. Select create new app.
1. Enter the app name.
1. Select region.

**Set up connection to Github Repository:**

1. Click the deploy tab and select GitHub - Connect to GitHub.
1. A prompt to find a github repository to connect to will then be displayed.
1. Enter the repository name for the project and click search.
1. Once the repo has been found, click the connect button.

**Set environment variables:**

Click the settings tab and then click the Reveal Config Vars button and add the following:

1. key: IP, value: 0.0.0.0
2. key: PORT, value: 5000
3. key: MONGO_DBNAME, value: (database name you want to connect to)
4. key: MONGO_URI, value: (mongo uri - This can be found in MongoDB by going to clusters > connect > connect to your application and substituting the password and 
    dbname that you set up in the link).
5. key: SECRET_KEY, value: (This is a custom secret key set up for configuration to keep client-side sessions secure).

**Enable automatic deployment:**
1. Click the Deploy tab
1. In the Automatic deploys section, choose the branch you want to deploy from then click Enable Automation Deploys.

### Run Locally

**Note: The project will not run locally with database connections unless the user sets up an [env.py](https://pypi.org/project/env.py/) file configuring IP, PORT, 
MONGO_URI, MONGO_DBNAME and SECRET_KEY. You must have the connection details in order to do this. These details are private and not disclosed in this repository 
for security purposes.**

1. Navigate to the GitHub [Repository](https://github.com/Daisy-McG/Motorbike-Event-Finder).
1. Click the Code drop down menu.
1. Either Download the ZIP file, unpackage locally and open with IDE (This route ends here) OR Copy Git URL from the HTTPS dialogue box.
1. Open your developement editor of choice and open a terminal window in a directory of your choice.
1. Use the 'git clone' command in terminal followed by the copied git URL.
1. A clone of the project will be created locally on your machine.

Once the project has been loaded into an IDE of choice, run the following command in the shell to install all the required packages:
> pip install -r requirements.txt

### Fork Project 

Most commonly, forks are used to either propose changes to someone else's project or to use someone else's project as a starting point 
for your own idea. - Definition from [Github Docs](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo).

1. Navigate to the GitHub Repository you want to fork.
1. On the top right of the page under the header, click the fork button.
    
    ![Fork](readme_images/fork.JPG)
1. This will create a duplicate of the full project in your GitHub Repository.

****
## Credits


### Code


### Acknowledgements



****