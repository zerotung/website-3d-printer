var express = require('express');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');
var util = require('util');

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
    var id = req.body.id || '';
    var title = req.body.title || '';
    var username = req.body.username || '';
    var task = req.body.task || '';
    if (!username || !task || !id) {
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
        id,
        title,
        task,
        username,
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

router.post('/file/uploading', function(req, res, next){
  var title = '';
  var id = guidGenerator();

  //生成multiparty对象，并配置上传目标路径
  var form = new multiparty.Form({uploadDir: './public/files/'});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);

    if(err){
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var inputFile = files["items[]"][0];
      var uploadedPath = inputFile.path;
      var dstPath = './public/files/' + id + '.' + inputFile.originalFilename.split('.')[1];
      title = inputFile.originalFilename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function(err) {
        if(err){
          console.log('rename error: ' + err);
        } else {
          console.log('rename ok');
        }
      });
    }
    return res.send({
      status: 1,
      data: {
        id,
        title
      }
    })
  });
});

function guidGenerator(){
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  }).toUpperCase();
}

module.exports = router;
