//The server.js file connects with the db

const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helper/create_router.js');
const path = require('path');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

MongoClient.connect('mongodb://localhost:27017')
    .then((client)=> {
        const db = client.db('tracker');
        const boozeCollection = db.collection('booze');
        const boozeRouter = createRouter(boozeCollection);
        app.use('/api/booze', boozeRouter);
    })
    .catch(console.error) //All the things that don't go through will show up in red.

app.listen(3000, function (){
    console.log(`listening on port ${this.address().port}`);
    
})
