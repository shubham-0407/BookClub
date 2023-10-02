const mongoose = require('mongoose');
const sellerSchema = mongoose.Schema({
    _id:{
        type: mongoose.SchemaTypes.String,
        required: [true, "id is required"]
    },
    firstName:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Name is required"]
    },
    lastName:{
        type: mongoose.SchemaTypes.String,
    },
    email:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Email is required"],
        unique: true
    },
    address:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Passoword is required"]
    },
    pincode:{
        type: mongoose.SchemaTypes.Number,
        required: [true, "Pincode is required"]
    }
},
{timestamps: true}
);

const sellerModel = mongoose.model('seller', sellerSchema);
module.exports  = sellerModel;

