$(document).ready(function () {
  var api = {
    "api": {
    	"token":"1234",
      "ctrl":"get",
      "route":"users"
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
          var str  = '<tr data-id="'+data.ansver[i].id+'"';
              if (data.ansver[i].active != 1) {
                str += 'style="background-color: #e47979;"';
              }
              str += '  >';
              str += '  <td>'+data.ansver[i].id+'</td>';
              str += '  <td>'+data.ansver[i].name+' '+data.ansver[i].surname+' '+data.ansver[i].second_name+'</td>';
              str += '  <td><a data-phone="'+data.ansver[i].phone+'" class="btn btn-success btn-block list"><span class="icon icon-list"></span></a></td>';
              str += '  <td><a data-phone="'+data.ansver[i].phone+'" class="btn btn-success btn-block edit"><span class="icon icon-edit"></span></a></td>';
              str += '  <td><div class="btn-group">';
              str += '        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
              str += '          <span class="icon icon-remove"></span>';
              str += '        </button>';
              str += '      <div class="dropdown-menu">';
              str += '        <div data-phone="'+data.ansver[i].phone+'" class="dropdown-item btn btn-primary btn-block ban-login" >По логину</div>';
              str += '        <div data-phone="'+data.ansver[i].phone+'" class="dropdown-item btn btn-primary btn-block ban-token" >По токену</div>';
              str += '      </div>';
              str += '  </div></td>';
              str += '</tr>';
          $('#users').after(str);
        }
        $('.list').click(function (e) {
          document.location = '/profile_phone/'+$(this).data('phone');
        });
        $('.edit').click(function (e) {
          document.location = '/edit_profile_phone/'+$(this).data('phone');
        });
        $('.ban-login').click(function (e) {
          console.log(e);
          var api = {
            "api": {
              "token":"1234",
              "ctrl":"ban_login",
              "route":"users",
              "phone": $(this).data('phone')
            }
          };
          $.ajax({
            type: "POST",
            url: "/api",
            data: JSON.stringify(api),
            dataType: "json",
            contentType: "application/json",
            success: function(data){
                location.reload();
                }
            });
        });
      }
    });




});
