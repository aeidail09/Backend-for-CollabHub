const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const HiringModel = require("../models/HiringModel.js");
exports.Register = async(req,res) => {
    try {
        const {email,password} = req.body;
        let Hiring = await HiringModel.findOne({email : email});
        if(Hiring){
            return res.status(400).json({message : "User Already Present"});
        }
        const HiringNew = new HiringModel({
            _id : new mongoose.Types.ObjectId(),
            email : email
        });
        const salt = await bcrypt.genSalt(10);
        HiringNew.password = await bcrypt.hash(password,salt);
        await HiringNew.save()
        .then((saved,err) => {
            if(saved){
                return res.status(200).json({message : "Created Hirer Successfully"});
            }
            else{
                return res.status(400).json({message : "Could not register"});
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({error : error});
    }
}
exports.Login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const HirerPresent = await HiringModel.findOne({email : email});
        if(!HirerPresent){
            return res.status(400).json({message : "Content Creator not Present"});
        }
        const isMatch = await bcrypt.compare(password,HirerPresent.password);
        if(!isMatch){
            return res.status(400).json({message : "Incorrect password"});
        }
        const payload = {
            HH : {
                id : HirerPresent._id
            }
        }
        jwt.sign(payload,process.env.JWT_KEY,{expiresIn : 3600},(err,token)=>{
            if (err) throw err;
            res.status(200).json({_id : HirerPresent._id,token : token})
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Could not login"})
    }
}
exports.Profile = async(req,res) => {
    const HirerData = await HiringModel.findById(req.userData["HH"].id);
    return res.status(200).json({email : HirerData["email"],role : req.userData["HH"].role})
}