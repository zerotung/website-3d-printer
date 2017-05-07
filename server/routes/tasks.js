var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.route('/')
  .get(function(req, res, next) {
    var type = req.query.type;
    var val = req.query.val;
    fs.readFile('./public/data/task.json', function(err, data) {
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
      tasks = obj.filter(p => p[type] === val);
      return res.send({
        status: 1,
        data: tasks
      })
    })
  })
  .post(function(req, res, next) {
    var username = req.body.username || '';
    var task = req.body.task || '';
    if (!username || !task) {
      return res.send({
        status: 0,
        info: '字段缺失'
      })
    }
    fs.readFile('./public/data/task.json', function(err, data) {
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
      newObj = {
        id: guidGenerator(),
        task,
        username: username,
        state: 'unchecked'
      };
      obj.push(newObj);
      var newData = JSON.stringify(obj);
      fs.writeFile('./public/data/task.json', newData, function(err) {
        if (err) {
          return res.send({
            status: 0,
            info: '写入json文件出错'
          });
        }
        return res.send({
          status: 1,
          data: newObj
        });
      });
    })

  })

function guidGenerator(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  }).toUpperCase();
}

module.exports = router;
