const myOrderModel = require('../models/my-order.model');
var express = require('express');
var router = express.Router();

/* Add empty order for new user on registering */
router.post('/regOrder', function (req, res) {
    let _id = req.body.email;   //email
    let order = [];
  
    let orderObj = new myOrderModel({
      _id: _id,
      order: order
    });
  
    orderObj.save(function (err, orderObj) {
      if (err) {
        console.log(err);
        res.send({ status: 500, message: 'Unable to create order' });
      }
      else {
        res.send({ status: 200, message: 'Order created successfully', OrderDetail: orderObj });
      }
    });
  });
  
  /* Add order items  for existing user */
  router.put('/addOrder', function (req, res) {
    const _id = req.body.id;
    const orderid = req.body.orderId;
    const quantity = req.body.quantity;
    const amount = req.body.amount;
    const orderitem = req.body.myOrderItem;
    
     
    let myOrderObj = myOrderModel.findByIdAndUpdate(
      { _id: _id },
      { $push: { order: {orderId:{
                        "id": orderid,
                        "quantity":quantity,
                        "amount":amount,
                        "orderBookId": orderitem
                       }
               } }
      },
      function (err, myOrderObj) {
        if (err) {
          res.send({ status: 500, message: 'Unable to add to order' });
        } else {
          res.send({ status: 200, message: 'Order added successfully', orderDetail: myOrderObj });
        }
      });
  });

/* GET single user cart */
router.get('/viewOrder', function (req, res) {
  let email = req.query.email;
  myOrderModel.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "order.orderItem.bookId",
        foreignField: "_id",
        as: "orderInfo"
      }
    },
    {
      $project: {
        "_id": 1,
        "order": 1,
        "orderInfo.Title": 1,
        "orderInfo.Price": 1,
        "orderInfo.Image": 1,
        "orderInfo._id": 1
      }
    },
    {
      $match: {
        "_id": email
      }
    }
  ], function (err, orderResponse) {
    if (err) {
      res.send({ status: 500, message: 'Unable to fetch order' });
    }
    else {
      // const recordCount = cartResponse.cart.length;
      res.send({ status: 200, message: "order fetched successfully", orderResult: orderResponse });
    }
  });
});


  

module.exports = router;

