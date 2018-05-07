$(document).ready(function () {
  var phone_one = $('#phone').val();


  $('#save_edit').click(function () {
    var api = {
      "api": {
      	"token":"1234",
        "ctrl":"set",
        "route":"profile",
        "who_phone": phone_one,
        "phone": $('#phone').val(),
        "name": $('#name').val(),
        "surname": $('#surname').val(),
        "second_name": $('#second_name').val(),
        "b_date": $('#b_date').val(),
        "email": $('#email').val()
      }
    };
    $.ajax({
      type: "POST",
      url: "/api",
      data: JSON.stringify(api),
      dataType: "json",
      contentType: "application/json",
      success: function(data){
        console.log(data);
        document.location = "/profile";
          }
      });
  });

  var api = {
    "api": {
    	"token":"1234",
      "ctrl":"get",
      "route":"profile",
      "phone": phone_one
    }
  };
  $.ajax({
    type: "POST",
    url: "/api",
    data: JSON.stringify(api),
    dataType: "json",
    contentType: "application/json",
    success: function(data){
        console.log(data);
        // $('#phone').prop('disabled',true);
        $('#name').val(data.ansver.name);
        $('#surname').val(data.ansver.surname);
        $('#second_name').val(data.ansver.second_name);
        $('#b_date').val(data.ansver.b_date);
        $('#email').val(data.ansver.email);
        }
    });
});
