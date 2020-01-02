const express = require('express');
const graphqlHttp = require('express-graphql'); 
const schema = require('./schema/schema');
const connectDB = require('./config/db');



const app = express();

connectDB();


app.use('/graphql',graphqlHttp({
    schema,
    graphiql:true
}))

app.listen(4000,() => console.log('Server is runnin on port 4000'));
