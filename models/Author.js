const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:String
    }
});

module.exports = mongoose.model('Author',AuthorSchema);