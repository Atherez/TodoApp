const dotenv    =   require('dotenv');
const mongoose  =   require('mongoose');        // To use MongoDB

const connectionString = process.env.MONGO_URL;


module.exports= mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true
        }).then(()=>{
            console.log('Database Connected Successfully');
        }).catch(err=>{
            console.log('Failed to connect to the Database -', err);
        })