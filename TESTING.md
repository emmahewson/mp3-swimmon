# SWIMMÔN Wild Swimming Events Website - Testing

![Mockup]()

This is the testing documentation for my web application: SWIMMÔN Wild Swimming Events Website. [Full README available here](README.md) 


The live Website can be found [here](https://swim-mon.herokuapp.com/).

---

## Table of Contents

- [Introduction](#introduction)
- [Validation](#validation)
    - [HTML Validation](#html-validation)
    - [CSS Validation](#css-validation)
    - [JavaScript Linting](#javascript-linting)
    - [Python Linting](#python-linting)
    - [Accessibility Testing](#accessibility)
    - [Performance Testing](#performance)
- [Feature Testing](#feature-testing)
    - [Responsiveness/Device Testing](#responsiveness--device-testing)
    - [Browser Compatibility](#browser-compatibility)
    - [Feature Testing Results](#feature-testing-results)
- [User Stories Testing]()



---


## Introduction

In my testing I developed a comprehensive testing plan to make sure that the site was functioning correctly. I used manual testing and automated validation to test the site. The site was tested throughout the process, both in the development and deployed version of the sites. All the test results detailed below are based on the [deployed site](https://emmahewson.github.io/mp2_travel_quiz/).

All information about any bugs encountered that were fixed or remain in the site can be found in the [README - Bugs & Fixes section](README.md/#bugs--fixes).

- - -


## Validation

### HTML Validation

I ran the code for all the pages through the [W3C HTML Validator](https://validator.w3.org/nu/). All pages passed the validation tests. For full results see the dropdowns below.


<details><summary>HTML Validation Results Table</summary>

| **Feature**      | **Expected Outcome**                  | **Test Performed**                            | **Result**                                                                                                | **Pass / Fail** |
|------------------|---------------------------------------|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------|-----------------|
| HOME             | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | 1 error - fix - type attribute removed from JavaScript Materialize script tag                             | PASS            |
| JOIN             | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| SIGN IN          | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| EVENTS           | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| EVENT            | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| ADD EVENT        | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| EDIT EVENT       | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| PROFILE          | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| LOCATION         | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| MANAGE LOCATIONS | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| ADD LOCATION     | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | Errors - stray </div> tag (removed) & character ref not closed with semi-colon (added). No errors remain. | PASS            |
| EDIT LOCATION    | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | Errors - stray </div> tag (removed) & character ref not closed with semi-colon (added). No errors remain. | PASS            |
| 404              | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| 413              | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| 415              | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |
| 500              | Page passes validation with no errors | Ran page through https://validator.w3.org/nu/ | No errors                                                                                                 | PASS            |


</details>


<details><summary>HTML Validation Results Screenshot</summary>

<img src="">

_Due to the site having user authentication & log in as well as using Jinja templating to build the page I had to test the HTML using the validator's text-input. Therefore all the results images look identical. Above is a sample of what all the results looked like._

</details>


- - -


### CSS Validation

I ran the CSS code through the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/#validate_by_input). All code passed the validation tests. For full results see the dropdowns below.


<details><summary>CSS Validation Results Table</summary>

| **Feature**    | **Expected Outcome**                  | **Test Performed**                                   | **Result**                                                                                                              | **Pass / Fail** |
|----------------|---------------------------------------|------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|-----------------|
| CSS Validation | Page passes validation with no errors | Ran CSS through https://jigsaw.w3.org/css-validator/ | Error on transform value on location picker map transition. Adjustments made to transform values (changed from % value to decimal) and CSS passed with no errors. | PASS            |


</details>


<details><summary>CSS Validation Results Screenshot</summary>

<img src="">

</details>


- - -

### JavaScript Linting

I ran the JavaScript code through [JSHint](https://jshint.com/). There were some minor errors & warnings which are detailed in the notes below. Based on the research done in to these errors, and the fact that they are mostly due to errors on the part of the validator or external code over which I have no control I have accepted them and marked the tests as passed for the purposes and scope of this project. For full results see the dropdowns below.


<details><summary>JavaScript Results Table</summary>

| **Feature**        | **Expected Outcome**                  | **Test Performed**                         | **Result**                                                                                                                          | **Pass / Fail** |
|--------------------|---------------------------------------|--------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| back.js            | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Minor errors including missing semi-colons and undeclared variables. All fixed. No errors remaining                                 | PASS            |
| event-form.js      | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Minor errors including missing semi-colons and undeclared variables. All fixed. No errors remaining                                 | PASS            |
| file-validation.js | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Minor errors including missing semi-colons. All fixed. No errors remaining                                                          | PASS            |
| map-event.js       | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Warnings about undefined/unused variables - all are called elsewhere by Google Maps API. No other errors.                           | PASS            |
| map-location.js    | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Warnings about undefined/unused variables - all are called elsewhere by Google Maps API. No other errors.                           | PASS            |
| map-picker.js      | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Fixed 1 spelling mistake. Warnings about undefined/unused variables - all are called elsewhere by Google Maps API. No other errors. | PASS            |
| map.js             | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Warnings about undefined/unused variables - all are called elsewhere by Google Maps API. No other errors.                           | PASS            |
| popover.js         | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Fixed 1 missing semi-colon. No errors remaining.                                                                                    | PASS            |
| script.js          | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Fixed 1 missing semi-colon. No errors remaining.                                                                                    | PASS            |
| scroll-top.js      | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Fixed 2 semi-colons. No errors remaining.                                                                                           | PASS            |
| search.js          | Page passes validation with no errors | Ran JavaScript through https://jshint.com/ | Minor errors including missing semi-colons and undeclared variables. All fixed. No errors remaining                                 | PASS            |


</details>


<details><summary>JavaScript Results Screenshots</summary>



</details>


- - -

### Python Linting

I ran the app.py code through [https://extendsclass.com/python-tester.html](https://extendsclass.com/python-tester.html) to check the Syntax. Code Anywhere also has a built in Python Linter which was used throughout the development process. All code passed the validation tests. For full results see the dropdowns below.


<details><summary>Python Results Table</summary>

| **Feature**    | **Expected Outcome**       | **Test Performed**                                             | **Result**                 | **Pass / Fail** |
|----------------|----------------------------|----------------------------------------------------------------|----------------------------|-----------------|
| Python Linting | Code passes with no errors | Ran app.py through https://extendsclass.com/python-tester.html | Code passes with no errors | PASS            |


</details>


<details><summary>Python Results Screenshots</summary>

<img src="">

</details>


- - -


### Accessibility

I ran the site through the [Wave Web Accessibility Evaulation Tool](https://wave.webaim.org/). There were some minor errors & warnings which I was unable to rectify which are detailed in the notes below. Based on the research done in to these errors, and the fact that they are mostly due to errors on the part of the validator or external code over which I have no control I have accepted them and marked the tests as passed for the purposes and scope of this project. For full results see the dropdowns below.


<details><summary>Accessibility Results Table</summary>

| **Feature**      | **Expected Outcome**                  | **Test Performed**                        | **Results - Fixed**                                                                                                                                | **Results - issues remaining (see notes)**                                   | **Pass / Fail** |
|------------------|---------------------------------------|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------|-----------------|
| HOME             | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Contrast error (increased contrast of pink elements across site)                                                                                   | Recurring warnings. Map errors/warnings.                                     | PASS            |
| JOIN             | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | No Errors                                                                                                                                          | Recurring warnings.                                                          | PASS            |
| SIGN IN          | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | No Errors                                                                                                                                          | Recurring warnings.                                                          | PASS            |
| EVENTS           | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Contrast errors: increased contrast of edit/delete buttons across site. Same-page link warnings on modal close: replaced a element with p element. | Recurring warnings.                                                          | PASS            |
| EVENT            | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Warning - suspicious alt text: removed 'image of' text in alt description                                                                          | Recurring warnings. Map errors/warnings.                                     | PASS            |
| ADD EVENT        | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Timepicker empty button error:  reinstated clear button                                                                                            | Recurring warnings.  Dropdown select menu label error. Datepicker Tab index. | PASS            |
| EDIT EVENT       | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Timepicker empty button error:  reinstated clear button                                                                                            | Recurring warnings. Dropdown select menu label error. Datepicker Tab index.  | PASS            |
| PROFILE          | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Empty link on cards: added sr-only text to empty links. Warning - suspicious alt text: removed 'image of' text in alt description.                 | Recurring warnings.                                                          | PASS            |
| LOCATION         | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Empty link on cards: added sr-only text to empty links. Warning - suspicious alt text: removed 'image of' text in alt description.                 | Recurring warnings. Map errors/warnings.                                     | PASS            |
| MANAGE LOCATIONS | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | Empty link on cards: added sr-only text to empty links. Warning - suspicious alt text: removed 'image of' text in alt description.                 | Recurring warnings.                                                          | PASS            |
| ADD LOCATION     | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | N/A                                                                                                                                                | Recurring warnings. Map errors/warnings.                                     | PASS            |
| EDIT LOCATION    | Page passes validation with no errors | Ran page through https://wave.webaim.org/ | N/a                                                                                                                                                | Recurring warnings. Map errors/warnings.                                     | PASS            |
| Error Pages x4   | Pages pass validation with no errors  | Ran page through https://wave.webaim.org/ | No Errors                                                                                                                                          | Recurring warnings.                                                          | PASS            |


</details>


<details><summary>Accessibility Results Screenshots</summary>

</details>




<details><summary>Notes on Accessibility Results</summary>

There were a number of errors and warnings highlighted by the validation process. Many of these I was able to fix and the details of those are in the table. However a number of these were issues stemming from either Materialize or from Google Maps API which I have been unable to remedy as these are external resources. There were also a couple of recurring warnings which I was able to safely disregard.

__Recurring Warnings__

Wave threw up a couple of minor warnings on every page which linked to to the nav & the footer:
- Underlined Text: the email link in the footer threw up a warning that underlined text indicated a link, however as this text was in fact a link no warning was necessary and I disregarded it.
- Redundant Link: a warning about 2 adjacent items in the nav link going to the same place, in this case the logo and the first nav item, as this was my intention I disregarded this warning.


__Google Map Errors/Warnings__

Google Maps threw up a number of errors and warnings in the accessibility checks. These were:
- Error - Image map area missing alternative text:
    - I researched what was causing this and it is a consistent error on Google Maps that has no known fix that wouldn't in fact make the map less accessible. Because of this I have left the site as it is and the accessibility flagged error remains. More information here: https://stackoverflow.com/questions/59326196/google-map-missing-alt-of-image-causing-lower-accessibility
- Warnings - various, including orphaned form label, very small text, redundant title text, layout table
    - I am unable to make any changes to counteract these warnings as they all relate to Google Maps' own styling and layout and as they are only warnings and not errors I have left the map as it is.

__Error: Label for Dropdown Menu on Forms__

On the forms containing dropdown menus Wave threw up an error about there not being an associated label for the input. However I had included a label with a matching 'for' attribute. Looking in to this problem further I discovered that the issue was caused by the Materialize JavaScript code creating a new input element when it populated the dropdown. Unfortunately in order to fix this I would have to re-write the entire code for the dropdown from scratch and so I was unable to fix this error. [See Bug 13 - No label for select dropdown menus on forms - Links to README](README.md/#13-accessibility---no-label-for-select-dropdown-menus-on-forms)

__Datepicker Tab Index__

The Materialize Datepicker has a tab index which threw a warning on Wave. However as this was a warning and not an error I decided to leave it as it was rather than trying to rebuild the whole Datepicker.

</details>


- - -


### Performance

I ran the site through Google Chrome Dev Tools' Lighthouse to check on its performance scores. All pages passed the validation tests. For full results see the dropdowns below.


<details><summary>Lighthouse Results Table</summary>

| **Feature**      | **Expected Outcome**                                                | **Test Performed**                                 | **Result**     | **Pass / Fail** |
|------------------|---------------------------------------------------------------------|----------------------------------------------------|----------------|-----------------|
| HOME             | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| JOIN             | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| SIGN IN          | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| EVENTS           | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| EVENT            | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| ADD EVENT        | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| EDIT EVENT       | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| PROFILE          | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| LOCATION         | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| MANAGE LOCATIONS | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| ADD LOCATION     | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |
| EDIT LOCATION    | Page get acceptable performance scores with no major flagged issues | Ran page through Chrome Dev Tools Lighthouse tests | All scores 90+ | PASS            |


</details>


<details><summary>Lighthouse Results Screenshots</summary>



</details>


- - -

## Feature Testing

The whole site and all its features were tested thoroughly throughout the development process and at the end of development. This testing covered content, style, interactive feature functionality as well as making sure all backend processes worked as expected including testing of all CRUD functionality and routing.

### **Responsiveness / Device Testing**

The site was tested on the following devices
* Apple Macbook Pro 16inch
* LG Ultrafine Display 27inch External Monitor
* Apple iMac 5K 27-inch
* Apple iPhone SE 2020
* Apple iPhone SE 2022
* Google Chrome Developer Tools - simulator for all different device options as well as using the adjustable sizing options

### **Browser Compatibility**

The site was tested on the following browsers.
* Google Chrome
* Mozilla Firefox
* Apple Safari

#### **Links to Bugs found specific to device & browser testing**

* [Materialize Dropdown not working correctly on iPhone - Links to README](README.md/#14-materialize-select-dropdown-on-iphone)

__ __

### **Feature Testing Results**