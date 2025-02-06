const express=require('express');

const port=8000;

const app=express();

const db=require('./config/mongoose');

const passport=require('passport');

const JwtStrategy=require('./config/passport-jwt');

const session=require('express-session');

app.use(express.urlencoded());

app.use(session({
    name:"rnw",
    secret:"rnw key",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:1000*60*60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is start:"+port);
})