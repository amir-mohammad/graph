const mongoose = require('mongoose');


const BookSchema = mongoose.Schema({
    name:{
        type:String
    },
    genre:{
        type:String
    }
});

module.exports = mongoose.model('Book',BookSchema);