function addLoacl(text, query) {
  var obj = {
	text: text,
	query: query
};
var ar_obj = JSON.parse(localStorage.getItem("msg"));
if (ar_obj) {
  ar_obj.push(obj);
}else {
  var ar_obj = [];
  ar_obj.push(obj);
}

var serialObj = JSON.stringify(ar_obj); //сериализуем его

localStorage.setItem("msg", serialObj);
}

function load_msg() {
  var returnObj = JSON.parse(localStorage.getItem("msg"));
  $.each(returnObj, function () {
    // console.log(this);
    var who = this.query == 0 ? 'self' : 'other';
    var query = '<li class="conversation-item">';
        query += '<div class="conversation-'+who+'">';
        query += '  <div class="conversation-messages">';
        query += '      <div class="conversation-message"onclick="tap_to_translate(this)">'+this.text+'</div>';
        query += '      <div class="conversation-timestamp">'+now()+'</div>';
        query += '    </div>';
        query += '  </div>';
        query += '</li>';
        $('#conversation_ai').append(query);
  });
}

$(document).ready(function () {
  // localStorage.clear();
  load_msg();
  $('#textarea_ai').keyup(function (e) {
    // console.log(e.which);
    if (e.which == 13) {
      send_msg($('#textarea_ai').val());
      $('#textarea_ai').val('');
    }
  });
  $('#send_ai').click(function () {
    send_msg($('#textarea_ai').val());
    $('#textarea_ai').val('');
  });
});
function send_msg(text) {

  if (text == '') {
    return 0;
  }

  var query = '<li class="conversation-item">';
      query += '<div class="conversation-other">';
      query += '  <div class="conversation-messages">';
      query += '      <div class="conversation-message"onclick="tap_to_translate(this)">'+text+'</div>';
      query += '      <div class="conversation-timestamp">'+now()+'</div>';
      query += '    </div>';
      query += '  </div>';
      query += '</li>';
  var tmp = '<li class="conversation-item tmp">';
      tmp += '<div class="conversation-self">';
      tmp += '  <div class="conversation-messages">';
      tmp += '      <div class="conversation-message"> • • • </div>';
      tmp += '    </div>';
      tmp += '  </div>';
      tmp += '</li>';
      $('#conversation_ai').append(query);
      // localStorage.setItem('msg', JSON.stringify("msg":{"text":text, "query": 1}));
      addLoacl(text, 1);
  // setTimeout(function () {
    $('#conversation_ai').append(tmp);
    var lng = 'ru';
    if ($('#option1').prop('checked') == true) {
      lng = 'ru';
    }else{
      lng = 'en';
    }
    var api = {
      "api": {
        "ctrl":"send",
        "route":"LADA",
        "text": text,
        "lng": lng
      }
    };
    $.ajax({
      type: "POST",
      url: "/api",
      data: JSON.stringify(api),
      dataType: "json",
      contentType: "application/json",
      success: function(data){
        addLoacl(data.ansver, 0);
            $('.tmp').remove();
            var lng = 'ru';
            if ($('#option1').prop('checked') == true) {
              var response = '<li class="conversation-item">';
                  response += '<div class="conversation-self">';
                  response += '  <div class="conversation-messages">';
                  response += '      <div class="conversation-message" onclick="tap_to_translate(this)">'+data.ansver+'</div>';
                  response += '      <div class="conversation-timestamp">'+now()+'</div>';
                  response += '    </div>';
                  response += '  </div>';
                  response += '</li>';
              $('#conversation_ai').append(response);
              // localStorage.setItem('msg', JSON.stringify("msg":{"text":text, "query": 0}));

              console.log(data);
              setTimeout(function () {
                $('.messenger-scrollable-content').animate({scrollTop:"+=250"}, '500');
              }, 100);
            }else{
              lng = 'en';
              var api = {
                "api": {
                  "ctrl":"translate",
                  "route":"photo",
                  "text": data.ansver,
                  "target": lng
                }
              };
              $.ajax({
                type: "POST",
                url: "/api",
                data: JSON.stringify(api),
                dataType: "json",
                contentType: "application/json",
                success: function(data){
                  var response = '<li class="conversation-item">';
                      response += '<div class="conversation-self">';
                      response += '  <div class="conversation-messages">';
                      response += '      <div class="conversation-message" onclick="tap_to_translate(this)">'+data.ansver[0]+'</div>';
                      response += '      <div class="conversation-timestamp">'+now()+'</div>';
                      response += '    </div>';
                      response += '  </div>';
                      response += '</li>';
                  $('#conversation_ai').append(response);
                  console.log(data);
                  setTimeout(function () {
                    $('.messenger-scrollable-content').animate({scrollTop:"+=250"}, '500');
                  }, 100);
                    }
                });
            }


          }
      });
  // }, 200);

}

function translate(text) {
  var lng = 'ru';
  if ($('#option1').prop('checked') == true) {
    lng = 'ru';
  }else{
    lng = 'en';
  }
  var api = {
    "api": {
      "ctrl":"translate",
      "route":"photo",
      "text": text,
      "target": lng
    }
  };
  $.ajax({
    type: "POST",
    url: "/api",
    data: JSON.stringify(api),
    dataType: "json",
    contentType: "application/json",
    success: function(data){
      console.log(data.ansver[0]);
      return data.ansver[0];
        }
    });
}

function tap_to_translate(btn){
  var lng = 'ru';
  if ($('#option1').prop('checked') == true) {
    lng = 'ru';
  }else{
    lng = 'en';
  }

  var api = {
    "api": {
      "ctrl":"translate",
      "route":"photo",
      "text": $(btn).text(),
      "target": lng
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
      $(btn).text(data.ansver[0]);
        }
    });
}

function now() {
  var diff = new Date();
  var d = diff;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ];
  for (var i = 0; i < d.length; i++) {
    d[i] = d[i].slice(-2);
  }
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}
