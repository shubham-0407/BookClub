const userModel = require('../models/user.model');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/list', function(req, res, next) {
   userModel.find(function(err, userList){
    if(err){
      res.send({status: 500, message:'Unable to find user'});
    }
    else{
      const recordCount = userList.length;
      res.send({status: 200, recordCount: recordCount, result: userList});
    }

   });
});

  
/* GET particular user details*/
router.get('/view', function(req, res, next) {
  const userId = req.query.userId;
  userModel.findById(userId, function(err, userResponse){
   if(err){
     res.send({status: 500, message:'Unable to find userId'});
   }
   else{
    console.log("userResponse",userResponse);
     res.send({status: 200, result: userResponse});
   }
  });
});


/* create new user */
router.post('/add', function(req, res, next) {
  console.log("come 1");
  let _id = req.body.email;
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;

  let userObj = new userModel({
    _id:_id,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password
  });
  console.log("come 3", userObj);
  userObj.save(function(err, userObj){
    if(err){
      console.log("cannot add", err);
      res.send({status: 500, message:'Unable to add user', error: err});
    }
    else{
      res.send({status: 200, message:'Added successfully', userDetail: userObj});
    }
  });
});

/* Update users data. */
router.put('/update', function(req, res, next) {
  const userId = req.body.userId;
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;

  let userObj = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password
  };
  

  userModel.findByIdAndUpdate(userId, userObj, function(err, userResponse){
    if(err){
      res.send({status: 500, message:'Unable to update user'});
    }
    else{
      res.send({status: 200, message:'Updated successfully', result: userResponse});
    }
  }); 
});

/* delete selected user */
router.delete('/delete', function(req, res, next) {
  const userId = req.query.userId;

  userModel.findByIdAndDelete(userId, function(err, userResponse){
   if(err){
     res.send({status: 500, message:'Unable to find userId'});
   }
   else{
     res.send({status: 200, message: 'Deleted Successfully' ,result: userResponse});
   }
  });
});

/** search for user */
router.get('/search', function (req, res) {
  // db.books.find({Title: /.*ENG/})
    const search = req.query.id;
    const id = ".*" + search + ".*"
    userModel.find({firstName: { $regex: id, $options: 'i' }}, function (err, userList) {
      if (err) {
        res.send({ status: 500, message: 'Unable to search user' });
      }
      else {
        const recordCount = userList.length;
        res.send({ status: 200, recordCount: recordCount, result: userList });
      }
    });
  });

module.exports = router;
