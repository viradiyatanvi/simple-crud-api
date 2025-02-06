
const express=require('express');

const routes=express.Router();

const signCtl=require('../controller/authController');

routes.post('/signup',signCtl.Signup);

routes.post('/login',signCtl.login);

module.exports=routes;