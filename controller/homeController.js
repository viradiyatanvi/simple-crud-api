const User=require('../models/UserModels');

module.exports.insertdata=async(req,res)=>{
    try{
        // console.log("insert data");
        let userdatas=await User.find();
        return res.status(200).json({'msg':"data insurt successfully",data:userdatas})
    }
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err})
    }
}
module.exports.addData=async(req,res)=>{
    try{
        // console.log(req.body);
        let userdata=await User.create(req.body);
        if(userdata){
            return res.status(200).json({'msg':"data added successfully",data:userdata});
        }
        else{
            return res.status(200).json({'msg':"data not added"});
        }
    }
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err})
    }
}
module.exports.deleteData=async(req,res)=>{
    try{
        let deletedata=await User.findByIdAndDelete(req.params.id);
        if(deletedata){
            return res.status(200).json({'msg':"data delete successfully",data:deletedata});
        }
        else{
            return res.status(200).json({'msg':"data not delete"});
        }
    }
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err})
    }
}

module.exports.getsingledata=async(req,res)=>{
    try{
        // console.log(req.query.dataid);
        let checkdata=await User.findById(req.query.dataid);
        if(checkdata){
            return res.status(200).json({'msg':"data get successfully",data:checkdata});
        }
        else{
            return res.status(200).json({'msg':"data not get"});
        }
    }
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err})
    }
}
module.exports.updatedata=async(req,res)=>{
    try{
        console.log(req.body);
        // console.log(req.params.id);
        let updatedata=await User.findById(req.params.id);
        if(updatedata){
            let updateuserdata=await User.findByIdAndUpdate(req.params.id,req.body);
            if(updateuserdata){
                return res.status(200).json({'msg':"data updated successfully",data:updateuserdata});
            }
            else{
                return res.status(200).json({'msg':"data not updated"});
            }
        }
        else{
            return res.status(200).json({'msg':"data not found"});
        }
    }
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err})
    }
}