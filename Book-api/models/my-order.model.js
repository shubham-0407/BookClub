const mongoose = require('mongoose');

const myOrderDataSchema= new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Order Id is required"]
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
    },
    amount: {
        type: mongoose.SchemaTypes.Number
    },
    orderBookId: {
            type: mongoose.SchemaTypes.Array,
            required: [true, "book id is required"]
    }
},
    { _id: false }
);

const myOrderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Id is required"],
    },
    // order: {
    //     type: mongoose.SchemaTypes.Array,
    //     required: [true]
    // }
    order:{
        orderId:[myOrderDataSchema]
    }
},
    { timestamp: true });

const myOrderModel = mongoose.model('my-order', myOrderSchema);
module.exports = myOrderModel;

