$(document).ready(function () {
  var api = {
    "api": {
    	"token":"1234",
      "ctrl":"get",
      "route":"profile",
      "phone": $('#phone').text()
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
        $('#fio').text(data.ansver.surname+' '+data.ansver.name+' '+data.ansver.second_name);
        $('#b_date').text(data.ansver.b_date);
        $('#email').text(data.ansver.email);
        }
    });
});
