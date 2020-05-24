/* This file will integrate all REST API endpoints so that our index.js file is clean */
const router = require('express').Router();

/* Test API 
 * TO BE REMOVED IN NEXT COMMIT
*/

router.get('/',(req,res)=>{
    res.end("API is working fine");
})


/* Route for auths */
router.use('/auth',require('./api/auth'));

module.exports = router;