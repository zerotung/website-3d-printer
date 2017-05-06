var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/')
  .get(function(req, res, next) {
    fs.readFile('./public/datas/user.json', function(err, data) {
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
      return res.send({
        status: 1,
        data: obj
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
      for (user in obj) {
        if (user.username == username) {
          return res.send({
            status: 0,
            info: '用户已存在'
          })
        }
      }
      obj.push({
        username: username,
        password: password,
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
          info: obj
        });
      });
    })

  })

module.exports = router;
