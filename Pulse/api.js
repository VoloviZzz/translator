var mysql               = require("mysql");
var dbSettings          = require("./db_settings.js");
var connection          = mysql.createConnection(dbSettings);
var fs                  = require("fs");
var gm                  = require('gm').subClass({imageMagick: true});
var SMSru               = require('sms_ru');
var sms                 = new SMSru('A255981B-8EBA-9FD1-FE18-F33A33DEDDCB');

var Translate           = require('@google-cloud/translate');

var translate           = new Translate({
                              projectId: '749953301684-al7u9suohogghiq5v5fd3dqar1485bnt.apps.googleusercontent.com',
                              keyFilename: 'client/uploads/LadaTranslate-721527b91fb8.json',
                              key: 'AIzaSyBkiGjZsaMyoOMggg1fUA2jaCtBvAbNuM0'
                            });

var vision                = require('@google-cloud/vision');

var client                = new vision.ImageAnnotatorClient({
                              projectId: '749953301684-al7u9suohogghiq5v5fd3dqar1485bnt.apps.googleusercontent.com',
                              keyFilename: 'client/uploads/LadaTranslate-721527b91fb8.json',
                              key: 'AIzaSyBkiGjZsaMyoOMggg1fUA2jaCtBvAbNuM0'
                            });

var dialogflow             = require('dialogflow');
var sessionClient          = new dialogflow.SessionsClient({
                              keyFilename: 'client/uploads/Small-Talk-7aad6900b3bd.json',
                            });
var projectId              = 'small-talk-2110b';
var sessionId              = 'AIzaSyBkiGjZsaMyoOMggg1fUA2jaCtBvAbNuM0';

var sessionPath            = sessionClient.sessionPath(projectId, sessionId);

var query = 'Привет';
var languageCode = 'ru';
// The text query request.
var request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

connection.connect();
var func = {};
exports.ctrl = function (mess, func) {
  if(mess.route == 'LADA'){
    if (mess.ctrl == 'send') {

      var query = mess.text;
      var languageCode = 'ru';

      var request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: query,
            languageCode: languageCode,
          },
        },
      };

      sessionClient
        .detectIntent(request)
        .then(responses => {
          console.log('Detected intent');
          const result = responses[0].queryResult;
          console.log(`  Query: ${result.queryText}`);
          console.log(`  Response: ${result.fulfillmentText}`);
          if (result.fulfillmentText) {
            var ansver = {
              status : "ok",
              ansver : result.fulfillmentText
            };
            func(ansver);
          }else {
            var ansver = {
              status : "bed",
              ansver : 'Ох, ты что-то мутный, парень. Не понимаю.'
            };
            func(ansver);
          }

          if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
          } else {
            console.log(`  No intent matched.`);
          }
        })
        .catch(err => {
          console.error('ERROR:', err);
        });



    }
  }else if(mess.route == 'news'){
    if (mess.ctrl == 'get') {
      var row = [];
      var sql = "SELECT * FROM news ORDER BY id DESC";
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
    }else if (mess.ctrl == 'del') {
      var sql = "DELETE FROM news WHERE id = "+mess.id+"";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var ansver = {
            status : "ok",
            ansver : "removed news"
          };
          func(ansver);
      });
    }else if (mess.ctrl == 'get_one') {
      var sql = "SELECT * FROM news WHERE id = "+mess.id+" LIMIT 1";
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var ansver = {
            status : "ok",
            ansver : rows
          };
          func(ansver);
      });
    }else if (mess.ctrl == 'set') {
      var sql = "UPDATE news SET title = '"+mess.title+"', photo = '"+mess.photo+"', body = '"+mess.body+"' WHERE id = "+mess.id;
      connection.query(sql, function(err, rows, fields){
          if(err) return console.log(err);
          var ansver = {
            status : "ok",
            ansver : rows
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
      }else if (mess.ctrl == 'get_one') {
        var sql = "SELECT * FROM my_tree WHERE id = "+mess.id+" LIMIT 1";
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
            var ansver = {
              status : "ok",
              ansver : rows
            };
            func(ansver);
        });
      }else if (mess.ctrl == 'set') {
        var sql = "UPDATE my_tree SET name = '"+mess.name+"', photo = '"+mess.photo+"', ip_adress = '"+mess.ip+"', type = '"+mess.type+"', status = '"+mess.status+"' WHERE id = "+mess.id;
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
            var ansver = {
              status : "ok",
              ansver : rows
            };
            func(ansver);
        });
      }
    }else if (mess.route == 'signup') {
      if (mess.ctrl == 'add') {
        var sql = "SELECT * FROM phone WHERE token = '"+mess.token+"' LIMIT 1";
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
            var sql = "INSERT INTO users SET name = '"+mess.name+"',surname = '"+mess.surname+"',second_name = '"+mess.second_name+"',email = '"+mess.email+"',phone = '"+mess.phone_number+"',b_date = '"+mess.b_date+"', pass = MD5("+mess.password+"), id_phone = "+rows[0].id+"";
            connection.query(sql, function(err, rows2, fields){
                if(err) return console.log(err);
                var ansver = {
                  status : "ok",
                  ansver : rows2
                };
                func(ansver);
            });
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
    }else if (mess.route == 'signup_admin') {
      if (mess.ctrl == 'add') {
        var sql = "SELECT * FROM phone WHERE token = '"+mess.token+"' LIMIT 1";
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
            var sql = "INSERT INTO employees SET name = '"+mess.name+"',surname = '"+mess.surname+"',second_name = '"+mess.second_name+"',email = '"+mess.email+"',phone = '"+mess.phone_number+"',b_date = '"+mess.b_date+"', pass = MD5("+mess.password+"), id_phone = "+rows[0].id+"";
            connection.query(sql, function(err, rows2, fields){
                if(err) return console.log(err);
                var ansver = {
                  status : "ok",
                  ansver : rows2
                };
                func(ansver);
            });
        });
      }else if (mess.ctrl == 'set') {
        var sql = "UPDATE employees SET pass = MD5("+mess.password+") WHERE phone = '"+mess.phone+"' LIMIT 1";
        connection.query(sql, function(err, rows2, fields){
            if(err) return console.log(err);
            var ansver = {
              status : "ok",
              ansver : "New password seted!"
            }
            func(ansver);
          });
      }else if (mess.ctrl == 'login') {
        var sql = "SELECT * FROM employees WHERE phone = '"+mess.phone+"' AND pass = MD5("+mess.password+") LIMIT 1";
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
      }else if (mess.ctrl == 'ban_token_with_phone') {
        var sql = "UPDATE users SET active = 0 WHERE phone = "+mess.phone;
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
        });
        var sql = "SELECT * FROM users WHERE phone = "+mess.phone;
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
            if (rows.length != 0) {
              var sql = "UPDATE users SET active = 0 WHERE id = "+rows[0].id;
              connection.query(sql, function(err, rows2, fields){
                  if(err) return console.log(err);
                      var ansver = {
                        status : "ok",
                        ansver : "User banned"
                      }
                      func(ansver);
              });
            }
        });

      }else if (mess.ctrl == 'ban_token') {
        var sql = "UPDATE phone SET active = 0 WHERE id = "+mess.id;
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
                var ansver = {
                  status : "ok",
                  ansver : "User banned"
                }
                func(ansver);
        });
      }
    }else if(mess.route == 'token'){
      if (mess.ctrl == 'add') {
        var sql = "INSERT INTO phone SET token = '"+mess.add_token+"', brand = '"+mess.brand+"', product = '"+mess.product+"', os = '"+mess.os+"', ip = '"+mess.ip+"'";
        connection.query(sql, function(err, rows, fields){
            if(err) return console.log(err);
            var ansver = {
              status : "ok",
              ansver : rows
            };
            func(ansver);
        });
      }else if (mess.ctrl == 'get') {
        var sql = "SELECT * FROM phone";
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
      }
    }else if(mess.route == 'photo'){
      if (mess.ctrl == 'crop') {
        var tmp = mess.img.split('.');
        var resize_photo = tmp[0]+'_resize_'+mess.num+'.'+tmp[1];
        gm('client'+mess.img)
          .resize(mess.edited_width, mess.edited_height)
          .crop(mess.width, mess.height, mess.x1, mess.y1)
          .noProfile()
          .write('client'+resize_photo, function (err) {
            if (!err){
              var ansver = {
                status : "ok",
                ansver : resize_photo
              };
              console.log('done');
              func(ansver);
            }else{
              console.log(err);
            }
          });

      }else if (mess.ctrl == 'detection_one') {
        client
          .documentTextDetection('client'+mess.img)
          .then(results => {
            fullTextAnnotation = results[0].fullTextAnnotation;
            var ansver = {
              status : "ok",
              ansver : fullTextAnnotation
            };
            func(ansver);
          })
          .catch(err => {
            console.error('ERROR:', err);
          });
      }else if (mess.ctrl == 'translate') {

         translate
          .translate(mess.text, mess.target)
          .then(results => {
            let translations = results[0];
            translations = Array.isArray(translations)
              ? translations
              : [translations];

              var ansver = {
                status : "ok",
                ansver : translations
              };
              func(ansver);

          })
          .catch(err => {
            console.error('ERROR:', err);
          });

      }else if (mess.ctrl == 'file') {

          var rand = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;


        fs.writeFile("client/uploads/f"+rand+".docx", ' '+mess.text, function(err) {
            if(err) throw err;
            var ansver = {
              status : "ok",
              ansver : rand
            };
            func(ansver);
        });

      }else {
        var ansver = {
          status : "bed",
          ansver : mess
        };
        func(ansver);

      }
    }else {
      var ansver = {
        status : "bed total",
        ansver : mess
      };
      func(ansver);
    }
}




function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
