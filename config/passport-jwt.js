const passport=require('passport');

const JwtStrategy =require('passport-jwt').Strategy;

const ExtractJwt =require('passport-jwt').ExtractJwt;

let opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :"rnw",
};

const signup=require('../models/SignModel');

passport.use(new JwtStrategy(opts,async(payload,done)=>{
    let checkemail=await signup.findOne({email:payload.userdata.email});
    if(checkemail){
        return done(null,checkemail);
    }
    else{
        return done(null,false);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
    let userdata=await signup.findById(id);
    if(userdata){
        return done(null,userdata);
    }
    else{
        return done(null,false);
    }
})

module.exports=passport;