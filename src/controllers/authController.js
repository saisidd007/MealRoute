const User = require("../models/User");


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser= async (req,res)=>{
    try{
        const {name ,email, password ,role}=req.body;
        const userExists = await User.findOne({email});
        if (userExists){
            return res.status(400).json({message : "user already exists "});
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        const user = await User.create(
            {
                name,email,password : hashPass ,role
            }
        );

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(201).json({
            message : "User Registered Succesfully",
            token
        });


    }
    catch (err){
        res.status(500).json({ message: err.message });
    }
};
const loginUser = async (req,res) =>{
    try{
        const {email,password}= req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }
        const pass = await bcrypt.compare(password,user.password);
        if (!pass){
            return res.status(400).json({message : "Invalid Credentials"});
        }
        const token = jwt.sign({id : user._id},process.env.JWT_SECRET, {expiresIn : "7d"});
        res.status(200).json({message : "Login Successful ", token});

    }
    catch(err){
        res.status(500).json({ message: err.message });
        }
}

module.exports = { registerUser ,loginUser};