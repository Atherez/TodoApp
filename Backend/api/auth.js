/* Dependencies */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken');

/* Models */
const User = require('../models/User');

/* Routes */
/*
  @type POST
  @route /api/auth/register
  @desc Route for registration of User [ Requires Verification ]
  @access PUBLIC
*/
router.post('/register',(req,res)=>{
    if(req.body.email && req.body.name && req.body.password){
        User.findOne({email:req.body.email})
        .then(user =>{
            if(user){
                return res.status(400).json({error:'Email Already Registered !'})
            }
            const newUser= new User({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
            });
            //Encrypting password using bycrptjs 
            bcrypt.genSalt(10, (err,salt )=> {
                if(err){
                    return res.status(500).json({
                        status:'500',
                        message:'Error while generating salt',
                        error:err})
                }
                bcrypt.hash(newUser.password, salt, (err, hash)=> {
                    if(err) {
                        return res.status(500).json({
                            status:'500',
                            message:'Failed while hashing password with the salt',
                            error:err})
                    };
                    newUser.password = hash;
                    newUser.save()
                        .then(user=>{
                            return res.status(200).json({
                                status:'200',
                                message:'Succesfully registered user',
                                user:user
                            })
                        })
                        .catch(err=>{
                            return res.status(500).json({
                                status:'500',
                                message:'Failed while saving user acoount',
                                error:err})
                        })
                })
            })
        })
        .catch(err=>{
            return res.status(500).json({
                status:'500',
                message:'Failed while validating if user already exists',
                error:err
            })
        })
    }else{
        return res.status(300).json({
            status:'304',
            message:'Bad Request',
            error:'Necessary Information Missing'
        })
    }
});

/*
 @type POST
 @route /api/auth/login
 @desc Route for Login of Registered User 
 @access PUBLIC
*/
router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user =>{
            if(!user){
                return res.status(404).json({
                    status:'404',
                    error:'User Account Not Found !'})
            }
            bcrypt.compare(req.body.password, user.password, (err, result)=> {
                if(err){
                    return res.status(500).json({
                        status:'500',
                        message:'Error while comparing hashed passwords',
                        error:err    
                    });
                }
                if(result){
                    var payload = {
                        id:user.id,
                        name:user.name,
                        email:user.email};
                        jsonwt.sign(payload,process.env.SECRET,{
                            expiresIn:'1h'
                        },(err,token)=>{
                            if(err) {
                                return res.status(500).json({
                                    status:'500',
                                    message:'Error while creating Token',
                                    error:err
                                })
                            }
                            else{
                                return res.status(200).json({
                                    status:'200',
                                    message:'Logged In and Token Generated',
                                    token:"Bearer "+token,
                                })
                            }
                        })
                }
                else{
                    return res.status(404).json({
                        status:'404',
                        error:"Password Mismatch"
                    });
                }
            });
            })
        .catch(err=>{
            return res.status(500).json({
                status:'500',
                message:'Error in Server while communication with DB',
                error:err
            })
        })
})


module.exports = router;