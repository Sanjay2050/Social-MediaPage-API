const router=require("express").Router();
const User = require("../models/User");
const Users=require("../models/User");
const bcrypt = require("bcrypt");


//register
router.post("/register", async(req,res)=>
{
   

  try{
       //generate new hashed password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password, salt);

          //generate new users
       const newUser = new User({
          username:req.body.username,
          email:req.body.email,
          password:hashedPassword,
     });

          //save user and return respond 
       const user = await newUser.save();
       res.status(200).json(user);
  }catch(err){
       console.log(err)
  }

});

//login 
router.post("/login", async(req,res)=>{
     try{
     const user =await Users.findOne({email:req.body.email});
     !user && res.status(404).json("user not found");

     const validPassword= await bcrypt.compare(req.body.password,user.password);
     !validPassword && res.status(400).json("Incorrect password");

     res.status(200).json(user);

     }catch{
          console.log(err);
     }
     
})


module.exports = router