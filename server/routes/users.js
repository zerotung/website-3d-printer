var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.route('/')
  .get(function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    fs.readFile('./public/data/user.json', function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          info: '读取文件出现异常'
        })
      }
      var obj = [];
      try {
        obj = JSON.parse(data.toString());
      } catch (e) {
        return res.send({
          status: 0,
          info: 'parse error'
        })
        obj = [];
      }
      userFind = obj.find(p => p.username === username);
      if (!userFind || userFind.password !== password) {
        return res.send({
          status: 0,
          info: '用户名或密码出错'
        })
      }
      return res.send({
        status: 1,
        data: {
          username: userFind.username,
          nickname: userFind.nickname
        }
      })
    })
  })
  .post(function(req, res, next) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    if (!username || !password) {
      return res.send({
        status: 0,
        info: '字段缺失'
      })
    }
    fs.readFile('./public/data/user.json', function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          info: '读取文件出现异常'
        })
      }
      var obj = [];
      try {
        obj = JSON.parse(data.toString());
      } catch (e) {
        return res.send({
          status: 0,
          info: 'parse error'
        })
        obj = [];
      }
      var userFind = obj.find(q => {
        return q.username === username
      });
      if (userFind) {
        return res.send({
          status: 0,
          info: '用户已存在'
        })
      }
      obj.push({
        username: username,
        password: password,
        nickname: ''
      });
      var newData = JSON.stringify(obj);
      fs.writeFile('./public/data/user.json', newData, function(err) {
        if (err) {
          return res.send({
            status: 0,
            info: '写入json文件出错'
          });
        }
        return res.send({
          status: 1,
          info: {
            username: username,
            nickname: '请修改您的昵称'
          }
        });
      });
    })

  })

router.route('/password')
  .post(function(req, res, next) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    var newPassword = req.body.newPassword || '';
    console.log(username, password, newPassword)
    if (!username || !password || !newPassword) {
      return res.send({
        status: 0,
        info: '字段缺失'
      })
    }
    fs.readFile('./public/data/user.json', function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          info: '读取文件出现异常'
        })
      }
      var obj = [];
      try {
        obj = JSON.parse(data.toString());
      } catch (e) {
        return res.send({
          status: 0,
          info: 'parse error'
        })
        obj = [];
      }
      var userFind = obj.find(q => {
        return q.username === username
      });
      if (!userFind || userFind.password !== password) {
        return res.send({
          status: 0,
          info: '原始密码错误'
        })
      }
      userFind.password = newPassword;
      var newData = JSON.stringify(obj);
      fs.writeFile('./public/data/user.json', newData, function(err) {
        if (err) {
          return res.send({
            status: 0,
            info: '写入json文件出错'
          });
        }
        return res.send({
          status: 1,
          info: {
            username: username
          }
        });
      });
    })
  })

router.route('/nickname')
  .post(function(req, res, next) {
    var username = req.body.username || '';
    var newNickname = req.body.newNickname || '';
    console.log(username, newNickname)
    if (!username || !newNickname) {
      return res.send({
        status: 0,
        info: '字段缺失'
      })
    }
    fs.readFile('./public/data/user.json', function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          info: '读取文件出现异常'
        })
      }
      var obj = [];
      try {
        obj = JSON.parse(data.toString());
      } catch (e) {
        return res.send({
          status: 0,
          info: 'parse error'
        })
        obj = [];
      }
      var userFind = obj.find(q => {
        return q.username === username
      });
      if (!userFind) {
        return res.send({
          status: 0,
          info: '用户不存在'
        })
      }
      userFind.nickname = newNickname;
      var newData = JSON.stringify(obj);
      fs.writeFile('./public/data/user.json', newData, function(err) {
        if (err) {
          return res.send({
            status: 0,
            info: '写入json文件出错'
          });
        }
        return res.send({
          status: 1,
          data: {
            nickname: newNickname
          }
        });
      });
    })
  })
module.exports = router;
