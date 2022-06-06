const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iNotebook_db');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'Error in connecting to db'));
db.once('open',function(){
    console.log("connected to db");
})