const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    _id:{
        type: mongoose.SchemaTypes.String,
        required: [true, "id is required"],
        unique:true
    },
    Title:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Title is required"]
    },
    Price:{
        type: mongoose.SchemaTypes.Number,
        required: [true, "Price is required"]
    },
    Genre:{
        type: mongoose.SchemaTypes.Array,
        required: [true, "Genre is required"]
    },
    Author:{
        type: mongoose.SchemaTypes.Array,
        required: [true, "Auhtor is required"]
    },
    Image:{
        type: mongoose.SchemaTypes.String,
        required: [true, "Image is required"]
    },

});

const bookModel = mongoose.model('book', bookSchema);
module.exports  = bookModel;

