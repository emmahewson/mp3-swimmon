$(document).ready(function(){

    // mobile nav bar
    $('.sidenav').sidenav({edge: "right"});

    // nav bar dropdown
    $(".dropdown-trigger").dropdown();

    // Materialize modal trigger (delete confirmation)
    $('.modal').modal();

    // set date in footer
    document.getElementById('copyright-year').innerText = new Date().getFullYear()
  });

