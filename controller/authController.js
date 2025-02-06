const Signup=require('../models/SignModel');
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");

module.exports.Signup=async(req,res)=>{
    try{
        let checkemail=await Signup.find({email:req.body.email}).countDocuments();
        if(checkemail==0){
            if(req.body.password==req.body.confirmpassword){
                req.body.password=await bcrypt.hash(req.body.password,10);
                let signupemail=await Signup.create(req.body);
                if(signupemail){
                    return res.status(200).json({'msg':"signup successfully",data:signupemail});
                }
                else{
                    return res.status(200).json({'msg':"not signup"});
                }
            }
            else{
                return res.status(200).json({'msg':"password and confirmpassword are not match"});
            }
        }
        else{
            return res.status(200).json({'msg':"data allready register"});
        }
    }
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err});
    }
}

module.exports.login=async(req,res)=>{
    try{
        let checkemail=await Signup.findOne({email:req.body.email});
        if(checkemail){
            let checkPassword=await bcrypt.compare(req.body.password,checkemail.password);
            if(checkPassword){
                let token=await jwt.sign({userdata:checkemail},"rnw"); 
                if(token){
                    return res.status(200).json({'msg':"login successfully",data:token});
                }
                else{
                    return res.status(200).json({'msg':"login not successfully"});
                }
            }
            else{
                return res.status(200).json({'msg':"invalid password"});
            }
        }
        else{
            return res.status(200).json({'msg':"invalid email"});
        }
    }
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err});
    }
}