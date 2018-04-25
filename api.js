const mysql = require("mysql");
const dbSettings = require("./db_settings.js");
const connection = mysql.createConnection(dbSettings);
var SMSru = require('sms_ru');
var sms = new SMSru('A255981B-8EBA-9FD1-FE18-F33A33DEDDCB');
connection.connect();


var func = {};
exports.ctrl = function (mess, func) {
  // console.log(mess);
  if (mess.token != '1234') {
    var ansver = {
      status : "bed",
      ansver : 'net tokena'
    };
    func(ansver);
  }else if(mess.route == 'news'){
    if (mess.ctrl == 'get') {
      var row = [];
      var sql = "SELECT * FROM news";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          for (var i = 0; i < rows.length; i++) {
            var body = rows[i].body;
            var body = body.replace(/"/g, "'");
            var tmp = {
              id : rows[i].id,
              title : rows[i].title,
              photo : rows[i].photo,
              body : body
            };
            // console.log(tmp);
            row.push(tmp);
          }
          var ansver = {
            status : "ok",
            ansver : row
          };
          func(ansver);
      });
    }else if (mess.ctrl == 'add') {
      var sql = "INSERT INTO news SET title = '"+mess.title+"', photo = '"+mess.photo+"', body = '"+mess.body+"'";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var ansver = {
            status : "ok",
            ansver : "Added news"
          };
          func(ansver);
      });
    }

  }else if (mess.route == 'tree') {
    if (mess.ctrl == 'get') {
      var sql = "SELECT * FROM my_tree ORDER BY left_key";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var ansver = {
            status : "ok",
            ansver : rows
          };
          func(ansver);
      });
    }else if (mess.ctrl == 'add') {
      var sql = "UPDATE my_tree SET left_key = left_key + 2, right_key = right_key + 2 WHERE left_key > "+mess.right_key;
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var sql = "UPDATE my_tree SET right_key = right_key + 2 WHERE right_key >= "+mess.right_key+" AND left_key < "+mess.right_key;
          connection.query(sql, function(err, rows, fields){
              if(err) return console.log(err);
              var sql = "INSERT INTO my_tree SET left_key = "+mess.right_key+", right_key = "+mess.right_key+" + 1, level = "+mess.level+" + 1, name = '"+mess.name+"'";
              connection.query(sql, function(err, rows, fields){
                  if(err) return console.log(err);
                  var ansver = {
                    status : "ok",
                    ansver : 'added stick'
                  };
                  func(ansver);
              });
          });
      });
    }else if (mess.ctrl == 'del') {
      var sql = "DELETE FROM my_tree WHERE left_key >= "+mess.left_key+" AND right_key <= "+mess.right_key;
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var sql = "UPDATE my_tree SET right_key = right_key - ("+mess.right_key+" - "+mess.left_key+" + 1) WHERE right_key > "+mess.right_key+" AND left_key < "+mess.left_key;
          connection.query(sql, function(err, rows, fields){
              if(err) return console.log(err);
              var sql = "UPDATE my_tree SET left_key = left_key - ("+mess.right_key+" - "+mess.left_key+" + 1), right_key = right_key - ("+mess.right_key+" - "+mess.left_key+" + 1) WHERE left_key > "+mess.right_key;
              connection.query(sql, function(err, rows, fields){
                  if(err) return console.log(err);
                  var ansver = {
                    status : "ok",
                    ansver : mess
                  };

                  func(ansver);
              });
          });
      });
    }
  }else if (mess.route == 'signup') {
    if (mess.ctrl == 'add') {
      // var sql = "INSERT INTO users SET name = '"+mess.name+"',surname = '"+mess.surname+"',second_name = '"+mess.second_name+"',email = '"+mess.email+"',phone = '"+mess.phone_number+"',b_date = '"+mess.b_date+"', pass = "+mess.password;
      var sql = "INSERT INTO users SET name = '"+mess.name+"',surname = '"+mess.surname+"',second_name = '"+mess.second_name+"',email = '"+mess.email+"',phone = '"+mess.phone_number+"',b_date = '"+mess.b_date+"', pass = MD5("+mess.password+")";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var ansver = {
            status : "ok",
            ansver : rows
          };
          func(ansver);
      });
    }else if (mess.ctrl == 'set') {
      var sql = "UPDATE users SET pass = MD5("+mess.password+") WHERE phone = '"+mess.phone+"' LIMIT 1";
      connection.query(sql, function(err, rows2, fields){
          if(err) return console.log(err);
          var ansver = {
            status : "ok",
            ansver : "New password seted!"
          }
          func(ansver);
        });
    }else if (mess.ctrl == 'login') {
      var sql = "SELECT * FROM users WHERE phone = '"+mess.phone+"' AND pass = MD5("+mess.password+") LIMIT 1";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          if (rows.length != 0) {
            var ansver = {
              status : "login",
              ansver : rows
            }
            func(ansver);
          }else {
            var ansver = {
              status : "bed",
              ansver : "Ooops, what's up?"
            }
            func(ansver);
          }
        });
    }else if (mess.ctrl == 'logout') {
          var ansver = {
            status : "logout",
            ansver : 'logout'
          }
          func(ansver);
    }
  }else if (mess.route == 'sms') {
    if (mess.ctrl == 'check') {
      var sql = "SELECT * FROM users WHERE phone = '"+mess.phone+"' LIMIT 1";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          if (rows.length != 0) {
            if (mess.code == rows[0].tmp_code) {
              var ansver = {
                status : "ok",
                ansver : "SMS sended"
              }
              func(ansver);
            }
          };
      });
    }else if (mess.ctrl == 'generate') {
      var code = rand(1000,9999);
      var sql = "SELECT * FROM users WHERE phone = '"+mess.phone+"' LIMIT 1";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          if (rows.length != 0) {
            var sql = "UPDATE users SET tmp_code = "+code+" WHERE phone = '"+mess.phone+"' LIMIT 1";
            connection.query(sql, function(err, rows2, fields){
                if(err) return console.log(err);
                console.log(code);
                sms.sms_send({
                  to: mess.phone,
                  text: 'Ваш код: '+code
                }, function(e){
                  console.log(e.description);
                  var ansver = {
                    status : "ok",
                    ansver : code
                  }
                  func(ansver);
                });
              });
          }else {
            var ansver = {
              status : "bad",
              ansver : 'Номера не существует'
            }
            return;
            // func(ansver);
          }
        });
    }
  }else if (mess.route == 'profile') {
    if (mess.ctrl == 'get') {
      var sql = "SELECT * FROM users WHERE phone = '"+mess.phone+"' LIMIT 1";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          if (rows.length != 0) {
              var ansver = {
                status : "ok",
                ansver : rows[0]
              }
              func(ansver);
          };
      });
    }else if (mess.ctrl = 'set') {
      var sql = "UPDATE users SET name = '"+mess.name+"',surname = '"+mess.surname+"',second_name = '"+mess.second_name+"',email = '"+mess.email+"',phone = '"+mess.phone+"',b_date = '"+mess.b_date+"' WHERE phone = '"+mess.who_phone+"' LIMIT 1";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
              var ansver = {
                status : "ok",
                ansver : mess
              }
              func(ansver);
      });
    }
  }else if (mess.route == 'users') {
    if (mess.ctrl == 'get') {
      var sql = "SELECT * FROM users";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          if (rows.length != 0) {
              var ansver = {
                status : "ok",
                ansver : rows
              }
              func(ansver);
          }
      });
    }else if (mess.ctrl == 'ban_login') {
      var sql = "UPDATE users SET active = 0 WHERE phone = "+mess.phone;
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
              var ansver = {
                status : "ok",
                ansver : "User banned"
              }
              func(ansver);
      });
    }
  }else {
    var ansver = {
      status : "bed",
      ansver : mess
    };
    func(ansver);
  }
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
