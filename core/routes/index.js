const express = require("express");
const router = express.Router();
const dbConn = require('../lib/db');
const bodyParser = require("body-parser");
var multer = require('multer');
const path = require("path");
// parse requests of content-type - application/json
router.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));
const md5 = require('md5');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/users');
const redis = require('redis');
const client = redis.createClient(6379, "localhost");
client.auth("workbemch", function (err) { if (err) throw err; });

router.post('/signup', (req, res, next) => {
  dbConn.query(
    `SELECT * FROM users WHERE LOWER(name) = LOWER(${dbConn.escape(
      req.body.name
    )});`,
    (err, result) => {
      if (result.length) {
        return res.json({
          status: 409,
          msg: 'This name is already in use!'
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.json({
              status: 500,
              msg: 'err'
            });
          } else {
            // has hashed pw => add to database
            dbConn.query(
              `INSERT INTO users ( name, email, password, registered, role_code ) VALUES (${dbConn.escape(req.body.name)},${dbConn.escape(
                req.body.email
              )}, ${dbConn.escape(hash)}, now(), ${dbConn.escape(req.body.role)})`,
              (err, result) => {
                if (err) {
                  throw err;
                }
                return res.json({
                  status: 201,
                  msg: 'Registered!'
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post('/login', (req, res, next) => {
  dbConn.query(
    `SELECT * FROM users WHERE email = ${dbConn.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      //console.log(result);
      if (err) {
        throw err;
      }
      if (!result.length) {
        // console.log(result.length);
        return res.json(
          {
            status: 401,
            msg: 'email or password is incorrect!'
          });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
          }
          if (bResult) {
            token = jwt.sign({
              name: result[0].name,
              id: result[0].id
            },
              'SECRETKEY', {
              expiresIn: '1h'
            }
            );
            dbConn.query(
              `UPDATE users SET last_login = now()`
            );
            var i = result[0].name + ',' + result[0].id;
            client.set(md5(token), i, (err, reply) => {
              if (err) throw err;
              //console.log(reply);
            });
            //   client.get('token', (err, reply) => {
            //     if (err) throw err;
            //     res.send(JSON.stringify({ "status": 200, "response":  reply}))
            // });
            return res.json({
              status: 200,
              msg: 'successfully Logged in!',
              token,
              user: result[0]
            });
          }
          return res.json({
            status: 401,
            msg: 'password is incorrect!'
          });
        }
      );
    }
  );

});

router.delete('/delToken', (req, res, next)=>{
    console.log(req);
       client.del(req.query.data, (err, reply) => {
                if (err) throw err;
                res.send(JSON.stringify({ "status": 200, "response":  reply}))
            });
})

router.post('/forgetpass', (req, res, next) => {
  //console.log(req.body.email);
  dbConn.query(
    `SELECT * FROM users WHERE email = ${dbConn.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
      }
      //console.log(result.length);
      if (result.length > 0) {
        var hash = bcrypt.hashSync(req.body.password, 10);

        if (hash) {
          dbConn.query(
            `UPDATE users SET password = ${dbConn.escape(hash)} where email = ${dbConn.escape(req.body.email)};`
          );
          return res.json({
            status: 200,
            msg: 'password is updated!'
          });
        }
      } else {
        return res.json(
          {
            status: 401,
            msg: 'email is not registered!'
          });
      }
    }
  );
});

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send('This is the secret content. Only logged in users can see that!');
});

router.get("/role", (req, res) => {
  let sql = "SELECT role_name as text, role_code as value FROM role ";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});
//s3 bucket

// const fs = require('fs');
// const AWS = require('aws-sdk');

// const s3 = new AWS.S3({
//   accessKeyId: 'AKIAQUNWBVYQZWE5266X',
//     secretAccessKey: 'ccdkaXOUTKjNYf50Vpi1iFjTr/or3Tn7BzW0FTWj'
// });

// const fileName = 'C:\\Users\\anu.m\\Documents\\workbench-react-new\\core\\routes\\example_video2.mp4';

// const uploadFile = () => {
//   fs.readFile(fileName, (err, data) => {
//      if (err) throw err;
//      const params = {
//          Bucket: 'anuworkbench', // pass your bucket name 
//          Key: '1601873503735-aws s3.zip', // file will be saved as testBucket/contacts.csv
//          Body: JSON.stringify(data, null, 2)
//      };
//      s3.upload(params, function(s3Err, data) {
//          if (s3Err) throw s3Err
//          console.log('File uploaded successfully at ${data.Location}')
//      });
//   });
// };

// const uploadVideoFile = () => {
// 	fs.readFile(fileName,  function (err, data) {
// 		if (err) { 
// 			console.log('fs error');
// 		} else {
// 			var params = {
// 				Bucket: 'anu-workbench', 
// 				Key: 'example_video2.mp4', 
// 				Body: data,
// 				ContentType: 'video/mp4'
// 			};

// 			s3.putObject(params, function(err, data) {
// 				if (err) { 
// 					console.log(err + 'Error putting object on S3: '); 
// 				} else { 
// 					console.log('Placed object on S3: '); 
// 				}  
// 			});
// 		}
// 	});
// };

//download a zip file from folder using url
router.get('/download/:file_name', function (req, res) {
  const file = `${__dirname}/public/` + req.params.file_name;
  res.download(file);
});

//download a zip file from folder using url
// router.get('/download/:file_name', function(req, res){
//   //console.log(req.params.file_name);
//   res.download('C:/Users/anu.m/Documents/workbench-react-new/core/routes/public/' +req.params.file_name); // Set disposition and send it.
// });

// uploadVideoFile();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/`)
    //cb(null, 'C:/Users/anu.m/Documents/workbench-react-new/core/routes/public')
  },
  filename: function (req, file, cb) {
    //console.log(file.originalname);
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage }).single('file')
router.post('/upload', function (req, res) {
  //console.log(req.body);
  upload(req, res, function (err) {
    // console.log(req.body.type);
    // console.log(req.file.filename);
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else {
      let sql;
      if (req.body.type === 'video') {
        sql = "UPDATE bot_details SET video_path='" + req.file.filename + "' WHERE bot_det_id=" + req.body.bot_det_id;
        dbConn.query(sql, (err) => {
          if (err) throw err;
          return res.send(JSON.stringify({ "status": 200, "message": "video is uploaded." }));
        });
      } else {
        sql = "UPDATE bot_details SET artefact_path='" + req.file.filename + "' WHERE bot_det_id=" + req.body.bot_det_id;
        dbConn.query(sql, (err) => {
          if (err) throw err;
          return res.send(JSON.stringify({ "status": 200, "message": "file is uploaded." }));
        });
      }
    }
  })
});


// for vedio streaming from folder using url
const fs = require('fs')
router.get('/video/:file_name', function (req, res) {
  // console.log(req.params.file_name);
  //const path = 'C:/Users/anu.m/Documents/workbench-react-new/core/routes/public/'+req.params.file_name;
  const path = `${__dirname}/public/` + req.params.file_name;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1

    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
})


router.get('/detailbyid/:botid', (req, res) => {
  //console.log(req.params.botid);
  let sql = "select b.title, a.app_name, c.cat_name, bd.artefact_path, bd.video_path, bd.features, bd.support, bd.tasks, bd.version, bd.detailed_des from bots b join bot_details bd on bd.bot_id = b.bot_id join applications a on a.app_id = b.app_id join categories c on c.cat_id = b.cat_id where b.bot_id =" + req.params.botid
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
}
)

//for bu dropdown
router.get("/buDropdown", (req, res) => {
  let sql = "SELECT bu_name as text, bu_id as value FROM business_process where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.get("/appDropdown", (req, res) => {
  let sql = "SELECT app_name as text, app_id as value FROM applications where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.get("/catDropdown", (req, res) => {
  let sql = "SELECT cat_name as text, cat_id as value FROM categories where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.get("/botTitleDropDown", (req, res) => {
  let sql = "SELECT title as text, bot_id as value FROM bots where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

//businessProcess
router.get("/businessprocess", (req, res) => {
  let sql = "SELECT * FROM business_process where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.post('/createbusinessprocess', (req, res) => {
  let data = { bu_name: req.body.bu_name };
  let sql = "INSERT INTO business_process SET ?";
  try {
    dbConn.query(sql, data, (err) => {
      if (err) throw err;
      res.send(JSON.stringify({ "status": 200, "message": "businessProcess is created." }));
    });
  } catch (e) {
    res.send(JSON.stringify({ "status": 0, "message": " failure." }));
  }
});

router.put('/updatebusinessprocess', (req, res) => {
  let sql = "UPDATE business_process SET bu_name='" + req.body.bu_name + "' WHERE bu_id=" + req.body.bu_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "businessProcess is updated." }));
  });
});

router.put('/deletebusinessprocess', (req, res) => {
  //console.log(req.body);
  let sql = "DELETE from business_process where bu_id=" + req.body.bu_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "businessProcess is deleted." }));
  });
});

//Applications
router.get("/application", (req, res) => {
  let sql = "SELECT * FROM applications where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.post('/createapplication', (req, res) => {
  let data = { app_name: req.body.app_name };
  let sql = "INSERT INTO applications SET ?";
  try {
    dbConn.query(sql, data, (err) => {
      if (err) throw err;
      res.send(JSON.stringify({ "status": 200, "message": "application is created." }));
    });
  } catch (e) {
    res.send(JSON.stringify({ "status": 0, "message": " failure." }));
  }
});

router.put('/updateapplication', (req, res) => {
  let sql = "UPDATE applications SET app_name='" + req.body.app_name + "' WHERE app_id=" + req.body.app_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "application is updated." }));
  });
});

router.put('/deleteapplication', (req, res) => {
  let sql = "DELETE from applications where app_id=" + req.body.app_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "application is deleted." }));
  });
});

//Categories
router.get("/categories", (req, res) => {
  let sql = "SELECT * FROM categories where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.post('/createcategory', (req, res) => {
  let data = { cat_name: req.body.cat_name };
  let sql = "INSERT INTO categories SET ?";
  try {
    dbConn.query(sql, data, (err) => {
      if (err) throw err;
      res.send(JSON.stringify({ "status": 200, "message": "category is created." }));
    });
  } catch (e) {
    res.send(JSON.stringify({ "status": 0, "message": " failure." }));
  }
});

router.put('/updatecategory', (req, res) => {
  let sql = "UPDATE categories SET cat_name='" + req.body.cat_name + "' WHERE cat_id=" + req.body.cat_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "category is updated." }));
  });
});

router.put('/deletecategory', (req, res) => {
  console.log(req.body.cat_id);
  let sql = "DELETE from categories where cat_id=" + req.body.cat_id;
  //console.log(sql);
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "category is deleted." }));
  });
});

//Bots
router.get("/bots", (req, res) => {
  // let sql = "SELECT * FROM bots where status = 1";
  sql = "select bots.title , bots.bot_id, ap.app_id, ap.app_name, ca.cat_id, ca.cat_name, b.bu_id, b.bu_name  from bots left join applications ap on bots.app_id = ap.app_id left join categories ca on bots.cat_id = ca.cat_id left join business_process b on bots.bu_id = b.bu_id where bots.status = 1"
  //let sql='select a.app_name, c.cat_name from bots b join applications a on a.app_id = b.app_id join categories c on c.cat_id = b.cat_id where b.bot_id = 1';
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

//bots title
router.get("/botsTitle", (req, res) => {
  let sql = "SELECT title as text, bot_id as value FROM bots where status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.post('/createbot', (req, res) => {
  let data = { title: req.body.title, app_id: req.body.app_id, bu_id: req.body.bu_id, cat_id: req.body.cat_id };
  let sql = "INSERT INTO bots SET ?";
  try {
    dbConn.query(sql, data, (err) => {
      if (err) throw err;
      res.send(JSON.stringify({ "status": 200, "message": "bot is created." }));
    });
  } catch (e) {
    res.send(JSON.stringify({ "status": 0, "message": " failure." }));
  }
});

router.put('/updatebot', (req, res) => {
  let sql = "UPDATE bots SET title='" + req.body.title + "', app_id='" + req.body.app_id + "' , cat_id='" + req.body.cat_id + "' , bu_id='" + req.body.bu_id + "' WHERE bot_id=" + req.body.bot_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "bot is updated." }));
  });
});

router.put('/deletebot', (req, res) => {
  let sql = "DELETE from bots where bot_id=" + req.body.bot_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "bot is deleted." }));
  });
});

//Bot details
router.get("/botdetail", (req, res) => {
  let sql = "SELECT * FROM bot_details left join bots bo on bo.bot_id = bot_details.bot_id where bo.status = 1";
  dbConn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "response": results }));
  });
});

router.post('/createbotdetail', (req, res) => {
  let data = {
    features: req.body.features, tasks: req.body.tasks, detailed_des: req.body.detailed_des,
    support: req.body.support, version: req.body.version, bot_id: req.body.bot_id
  };

  let sql = "INSERT INTO bot_details SET ?";
  try {
    dbConn.query(sql, data, (err) => {
      if (err) throw err;
      res.send(JSON.stringify({ "status": 200, "message": "bot deatils are created." }));
    });
  } catch (e) {
    res.send(JSON.stringify({ "status": 0, "message": " failure." }));
  }
});

router.put('/updatebotdetail', (req, res) => {
  let sql = "UPDATE bot_details SET version='" + req.body.version + "' , features='" + req.body.features + "' , tasks='" + req.body.tasks + "' , detailed_des='" + req.body.detailed_des + "' , support='" + req.body.support + "', selectedValue='" + req.body.selectedValue + "'  WHERE bot_det_id=" + req.body.bot_det_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "bot deatils are updated." }));
  });
});

router.put('/deletebotdetail', (req, res) => {
  let sql = "DELETE from bot_details where bot_det_id=" + req.body.bot_det_id;
  dbConn.query(sql, (err) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "message": "bot deatils are deleted." }));
  });
});

module.exports = router