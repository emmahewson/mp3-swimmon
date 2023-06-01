$(document).ready(function(){
    /**
     * Go Back button - goes to previous page
     * Used to allow user to go back to the pre-filled form
     * Avoids using browser buttons or losing form data
     */
    $('#error-button').on("click", function() {
        history.back();
    });
});