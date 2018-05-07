$(document).ready(function () {
  var error = false;
  $('#password2').keyup(function (e) {
    if ($(this).val() == $('#password').val()) {
      $(this).css('border', '1px solid rgb(0, 221, 0)');
      error = false;
    }else {
      $(this).css('border', '1px solid rgb(221, 0, 0)');
      error = true;
    }
  });
  $('.russian_word').each(function (i) {
    $(this).keydown(function () {
      var tmp = $(this).val();
      tmp = tmp.replace(/[^а-яА-Я]/g, '');
      $(this).val(tmp);
    });
  })
  $('#create_user').click(function () {
    if ($('#email').val() == '' || $('#surname').val() == '' || $('#name').val() == '' || $('#second_name').val() == '' || $('#phone_number').val() == '' || $('#b_date').val() == '' || $('#password').val() == '') {
      error = true;
    }
    if ($('#password').val().length < 5) {
      error = true;
    }
    if (error == true) {
      alert('Ошибка');
    }else {
      var api = {
        "api": {
        	"token":"1234",
          "ctrl":"add",
          "route":"signup_admin",
          "email":$('#email').val(),
          "surname":$('#surname').val(),
          "name":$('#name').val(),
          "second_name":$('#second_name').val(),
          "phone_number":$('#phone_number').val(),
          "b_date":$('#b_date').val(),
          "password":$('#password').val()
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
            document.location = "/login";
            }
        });
    }
  });
});
