const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
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
    password:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Passoword is required"]
    } 
},
{timestamps: true}
);

const userModel = mongoose.model('user', userSchema);
module.exports  = userModel;

