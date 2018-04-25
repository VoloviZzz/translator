$(document).ready(function () {

  var api = {
    "api": {
    	"token":"1234",
      "ctrl":"get",
      "route":"news"
      // "phone": $('#phone').text()
    }
  };
  $.ajax({
    type: "POST",
    url: "/api",
    data: JSON.stringify(api),
    dataType: "json",
    contentType: "application/json",
    success: function(data){
        console.log(data.ansver);
        for (var i = 0; i < data.ansver.length; i++) {
          var str  = '<div class="form-group">';
              str += '  <ul class="list-inline form-news" id="new'+data.ansver[i].id+'">';
              str += '    <li>';
              str += '      <big>'+data.ansver[i].title+'</big>';
              str += '    </li>';
              str += '    <li>';
              str += '      <img src="'+data.ansver[i].photo+'">';
              str += '    </li>';
              str += '    <li class="body-small">';
              str += '      <small>'+data.ansver[i].body.substr(0, 130)+'... </small>';
              str += '    </li>';
              str += '    <li class="body-full" style="display:none">';
              str += '      <small></small>';
              str += '    </li>';
              str += '  </ul>';
              str += '</div>';
          $('#news').append(str);
          $('#new'+data.ansver[i].id).find('.body-full small').html(data.ansver[i].body);
          // $('#new'+data.ansver[i].id).find('.body-full small').html(convert_body(data.ansver[i].body));
        }
        $('.form-news').click(function () {
          $(this).find('.body-small').toggle();
          $(this).find('.body-full').toggle();
          console.log('click');
        });
      }
    });
});

function convert_body(text) {
  var regexp = /<photo>(.*)<\/photo>/gu;
  var out = text.match(regexp);
  console.log(out);
  var text = text.replace(/<photo>(.*)<\/photo>/,  '<li><img src="'+out+'"></li>');
  return text;
}
























//---
