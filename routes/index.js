const express=require('express');

const passport=require('passport');

const User=require('../models/UserModels');

const routes=express.Router();

const homeCtl=require('../controller/homeController');

routes.get('/',passport.authenticate("jwt",{failureRedirect:"/unauth"}),homeCtl.insertdata);

routes.get('/unauth',async(req,res)=>{
    return res.status(400).json({'msg':"you are not authenticate"});
})

routes.post('/addData',passport.authenticate("jwt",{failureRedirect:"/unauth"}),User.uploadImageFile,homeCtl.addData);

routes.delete('/deleteData/:id',passport.authenticate("jwt",{failureRedirect:"/unauth"}),homeCtl.deleteData);

routes.get('/getsingledata',passport.authenticate("jwt",{failureRedirect:"/unauth"}),homeCtl.getsingledata);

routes.patch('/updatedata/:id',passport.authenticate("jwt",{failureRedirect:"/unauth"}),homeCtl.updatedata);

routes.use('/auth',require('./authRoutes'));

module.exports=routes;