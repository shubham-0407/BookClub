const sellerModel = require('../models/seller.model');
var express = require('express');
var router = express.Router();


/* GET seller listing. */
router.get('/list', function(req, res, next) {
    sellerModel.find(function(err, sellerList){
     if(err){
       res.send({status: 500, message:'Unable to find seller'});
     }
     else{
       const recordCount = sellerList.length;
       res.send({status: 200, recordCount: recordCount, result: sellerList});
     }
 
    });
 });

/* create new user */
router.post('/add', function(req, res, next) {

    let _id = req.body.email;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let pincode = req.body.pincode
  
    let sellerObj = new sellerModel({
      _id:_id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
      pincode: pincode
    });

    sellerObj.save(function(err, sellerObj){
      if(err){
        console.log("cannot add", err);
        res.send({status: 500, message:'Unable to add seller', error: err});
      }
      else{
        res.send({status: 200, message:'Added successfully', sellerDetail: sellerObj});
      }
    });
  });

  /** Search seller */
  router.get('/search', function (req, res) {
    // db.books.find({Title: /.*ENG/})
      const search = req.query.id;
      const id = ".*" + search + ".*"
      sellerModel.find({firstName: { $regex: id, $options: 'i' }}, function (err, sellerList) {
        if (err) {
          res.send({ status: 500, message: 'Unable to search seller' });
        }
        else {
          const recordCount = sellerList.length;
          res.send({ status: 200, recordCount: recordCount, result: sellerList });
        }
      });
    });
 
  module.exports = router;