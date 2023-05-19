$(document).ready(function(){

    $('#image_upload').on('change', function() {
          
        const size = 
           (this.files[0].size / 1024 / 1024).toFixed(2);
           console.log(size);

           $("#file-text-div").removeClass("hidden");
           $("#file-message").text("File size: " + size + " MB");
      
        if (size > 5) {
            $("#file-message-warning").text("Max file size is 5MB, please choose a smaller image.");
            $('#location-submit').attr("disabled", true)
        } else {
            $('#location-submit').attr("disabled", false)
            $("#file-message-warning").text("");
        }
    });

  });

