/**
 * Handles front end validation on image upload on location forms
 * adapted from https://www.geeksforgeeks.org/validation-of-file-size-while-uploading-using-javascript-jquery/
 */

$(document).ready(function(){

    // checks for an image being uploaded
    $('#image_upload').on('change', function() {
        
        // check if an image was uploaded
        if (this.files.length == 0) {

            /**
             * if no image uploaded (user pressed 'cancel') resets warnings & enables submit button
             * this allows the user to still submit without uploading on the edit-location form & keep previous image
             */
            $("#file-message-warning").text("");
            $("#file-message").text("");
            $('#location-submit').attr("disabled", false);

        } else {

            // if an image was submitted
            
            // gets image size
            const size = (this.files[0].size / 1024 / 1024).toFixed(2);

            // tells the user the file size
            $("#file-message").text("File size: " + size + " MB");
      
            // checks the file size is less than 5MB
            if (size > 5) {

                // if bigger than 5MB reveals warning text & disables the submit button
                $("#file-message-warning").text("Max file size is 5MB, please choose a smaller image.");
                $('#location-submit').attr("disabled", true);

            } else {

                // if less than 5MB enables the submit button & hides the warning text
                $('#location-submit').attr("disabled", false);
                $("#file-message-warning").text("");
            }
        }     
    });
});