
/* All Dependencies */
const express   =   require('express');
const dotenv    =   require('dotenv').config(); // To use Enviornment Variables
const mongoose  =   require('mongoose');        // To use MongoDB
const bodyparser=   require('body-parser');     
const passport  =   require('passport');

/* Our Express App Object */
/* Express is a middleware that handles our routes */

const app = express();

/* Configuring all Middlewares */

/* Body Parser helps us to parse the payload/body sent with request
 * First, command below is to allow url endcoded elements ( data sent as form elements )
 * Second, is for Json data sent. JSON means Javascript Object Notation.
*/
app.use( bodyparser.urlencoded({extended:false}) );
app.use( bodyparser.json() );

/* Initalizing Passport, Passport is a javascript library/middleware that allows us to perform authentication on routes */
app.use(passport.initialize());

/* Importing routes to use 
 * What is a Route ?
 * Ans- Lets suppose you go to facebook.com this is the host. Then you go to facebook.com/posts , so here /posts is a route.
*/
const router    =   require('./router');
app.use('/api',router);

/* Starting the Server and Listening on te port */
const hostname = process.env.HOST || 'localhost';
const portname = process.env.PORT || 8000;

app.listen(portname,hostname,()=>{
    console.log(`Server Started at http://${hostname}:${portname}`);
});
