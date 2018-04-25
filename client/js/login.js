$(document).ready(function () {
  $('#login').click(function () {
    var pass = $('#password').val();
    var user = $('#username').val();
    console.log(pass +' - '+ user);
    var api = {
      "api": {
        "token":"1234",
        "ctrl":"login",
        "route":"signup",
        "phone": user,
        "password":pass
      }
    };
    $.ajax({
      type: "POST",
      url: "/api",
      data: JSON.stringify(api),
      dataType: "json",
      contentType: "application/json",
      success: function(data){
          document.location = "/news";
          }
      });


      console.log('Thor is here!');
  });

});
