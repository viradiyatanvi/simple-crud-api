const User=require('../models/UserModels');

const path=require('path');

const fs=require('fs');

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
        // console.log(req.file);

        let imagepath='';
        if(req.file){
            imagepath=await User.imgpath+'/'+req.file.filename;
        }
        req.body.image=imagepath

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

        let finddata=await User.findById(req.params.id);
        if(finddata){
            try{
                let deletedata=path.join(__dirname,'..',finddata.image);
                await fs.unlinkSync(deletedata);
            }
            catch(err){
                return res.status(400).json({'msg':"image not found"});
            }
            let deletedata=await User.findByIdAndDelete(req.params.id);
            if(deletedata){
                return res.status(200).json({'msg':"data delete successfully",data:deletedata});
            }
            else{
                return res.status(200).json({'msg':"data not delete"});
            }
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
        // console.log(req.body);
        // console.log(req.params.id);
       
            if(req.file){
                let finddata=await User.findById(req.params.id);
               
                    try{
                        let deletedata=path.join(__dirname,'..',finddata.image);
                        await fs.unlinkSync(deletedata);
                    }
                    catch(err){
                        return res.status(400).json({'msg':"image not found"})
                    }
                req.body.image=await User.imgpath+'/'+req.file.filename

            let updateuserdata=await User.findByIdAndUpdate(req.params.id,req.body);
            if(updateuserdata){
                let updatefind=await User.findById(updatedata._id);
                return res.status(200).json({'msg':"data updated successfully",data:updatefind});
            }
            else{
                return res.status(400).json({'msg':"data not updated"});
            }
    }else{
        let userrecord=await User.findById(req.params.id);
        req.body.image=userrecord.image;

        let edituser=await User.findByIdAndUpdate(req.params.id,req.body);
        if(edituser){
            let updates=await User.findById(edituser._id);
            return res.status(400).json({'msg':"data updated successfully",data:updates});
        }
        else{
            return res.status(400).json({'msg':"data not updated"});
        }
    }
}
    catch(err){
        return res.status(400).json({'msg':"something is wrong",error:err})
    }
}