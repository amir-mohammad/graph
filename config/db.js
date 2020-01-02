const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () =>{
    mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    },() =>{
        try {
            console.log('Database is connected');
            return true;
        } catch (error) {
            console.log("db is not connected");
            process.exit(1);
            return false;

        }
    })
}

module.exports = connectDB;