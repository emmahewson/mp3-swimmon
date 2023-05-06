# SWIMMÔN Wild Swimming Events Website

THIS PROJECT IS A WORK IN PROGRESS

SWIMMÔN is a website for swimmers on The Isle of Anglesey / Ynys Môn to find and set up wild swimming meet ups around the island. The live Website can be found [here](https://swim-mon.herokuapp.com/).

![Mockup]()
****
## Table of Contents

* [User Experience (UX)](#user-experience-design)
    * [Strategy Plane](#strategy-plane)
    * [Scope Plane](#scope-plane)
    * [Structure Plane](#structure-plane)
    * [Skeleton Plane](#skeleton-plane)
    * [Surface Plane](#surface-plane)
- [Features](#Features)
    * [Current Features](#Current-Features)
    * [Future Features](#future-features)
* [Technologies](#Technologies)
* [Testing](#Testing)
    * [Bugs]()
* [Deployment](#Deployment)
* [Credits](#Credits)


****

## User Experience Design
### **Strategy Plane**


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
### **Scope Plane**

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
### **Structure Plane**
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
### **Skeleton Plane**
[For wireframes see Surface Plane](#wireframes)

#### Database Design
MongoDB Object format examples:

**Collection: events**<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;_id : unique-value,<br>
&nbsp;&nbsp;&nbsp;&nbsp;name : "Sunday Swim",<br>
&nbsp;&nbsp;&nbsp;&nbsp;description : "A relaxed dip with friendly people to get our Sundays off to a good start.",<br>
&nbsp;&nbsp;&nbsp;&nbsp;date : "2023-06-13T10:00:00.000+00:00",<br>
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
### **Surface Plane**
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
## Features

### Existing Features


### Future Features

****
## Technologies
## Technologies Used

### Languages
* [HTML](https://en.wikipedia.org/wiki/HTML5)
    * Used to build the main structure of the site
* [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
    * Used to style the website
* [JavaScript] is used for:
    * Events search bar collapsible
    * 
* [JQuery](https://jquery.com/) is used for the following:
    * Mobile Side Nav
    * 
* [Python](https://en.wikipedia.org/wiki/Python_(programming_language))
    * Used to build the core of the backend of the project as well as the running/viewing of the website
    * Python Modules Used:
        * click==8.1.3
        * dnspython==2.3.0
        * Flask==2.2.3
        * Flask-PyMongo==2.3.0
        * itsdangerous==2.1.2
        * pymongo==4.3.3
        * Werkzeug==2.2.3

### Tools
* [Git](https://git-scm.com/)
    * Used for version control via Code Anywhere by using the terminal to Git and Push to GitHub
* [GitHub](https://github.com/)
    * Used to store the project code
* [Code Anywhere](https://codeanywhere.com/)
    * Used to create, edit & preview the project's code
* [Heroku](https://dashboard.heroku.com/apps)
    * Used to deploy the live site
* [Figma](https://www.figma.com/)
    * Used to develop the wireframes in to a full mockup including colours, fonts, proportions etc
* [Materialize](https://getbootstrap.com/)
    * Used to help with the responsiveness of the site in much of the structural layout
    * Used date and time picker for the add event form
* [Google Fonts](https://fonts.google.com/)
    * Used to select & import the fonts to the project (Jost & Lato)
* [Font Awesome](https://fontawesome.com/)
    * Used to add icons to the site to help with UX and to add more character
* [Adobe Illustrator](https://www.adobe.com/uk/products/illustrator.html)
    * Used to create the site logo
* [Adobe Photoshop](https://www.adobe.com/uk/products/photoshop.html)
    * Used to crop, adjust and resize the photos to optimise them for the site
* [Tiny PNG](https://tinypng.com/)
    * Used to further optimise the images for the site and reduce file size
* [Favicon.io](https://favicon.io/favicon-converter/)
    * Used to create and add the favicon to the browser tab
* [Google Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools)
    * Used to inspect page elements, debug issues with the site & test responsiveness on different mockup devices
* [Techsini](http://techsini.com/multi-mockup/index.php)
    * Website mockup image generator for images in this README.


****
## Testing

### Bugs & Fixes

During development and testing I encountered the following bugs:
- - -
#### **1: Dropdown Search Bar `<a>` link not displaying properly**

The 'reset all' button at the bottom of the events searchbar (within the dropdown menu) was not displaying properly and getting cut off by the div padding. This appeared to be caused by the way the dropdown menu worked, not recognising the `<a>`'s full height. I fixed this by wrapping the `<a>` inside a `<p>` element, which solved the problem.


<details><summary>Screenshots</summary>

<img src="">
<img src="">

*Before & After*

</details>


#### **2: Popover (hover info box) on mobile not scrolling**

When creating the info boxes on the form I that would appear on hover I set up a `scrollIntoView()` function on clicking the '?' circle for smaller screens to make sure that the popover was visible. This worked fine on both the development and deployed site (including in Dev Tool's mobile mockups) but during testing on an iPhone SE 2020 I found that on one of the elements the scroll didn't work on any of the installed browsers on the first click, but did on the 2nd. However it worked perfectly on other identical popover trigger elements. 

I troubleshooted this issue for a long time, it appears to be related to the hover/focus on mobile and how it translates to a touchscreen device. I tried using a 'touchstart' event rather than click - which fixed the scroll but would also not consistently bring up the infobox. I also tried refactor the code, adding `setTimeout()` to allow the box to appear first and attempting to scroll using an `<a>` with an href that pointed to the correct ID but all of these caused further issues or didn't solve the problem. I was unable to find a solution to this and the bug remains.


<details><summary>Screenshots</summary>

<img src="">
*Working on Dev Tools' Mobile Mockup*

<img src="">
*Before & After*


</details>


****
## Deployment


****
## Credits


### Code


### Acknowledgements



****