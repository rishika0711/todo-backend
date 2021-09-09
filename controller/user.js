//const { Model, model } = require("mongoose");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const userController = {
  create: async (req, res) => {
    try{
      const { firstname, email, password, age, dob } = req.body;
      let existingUser = await User.findOne({ email });
      console.log('exisiting User', existingUser);

      if(existingUser){
        res.status(400).send({
          message: "User Already Exists",
          status: false
        })
      }

      const user = new User({
        firstname,
        email,
        password,
        age,
        dob,
      })

      //encrypt the password
      //two types  enription mai encrption and depriction dono hota hai 
      // and in hash we have only encription
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const newUser = await user.save();
      
      res.status(200).send({
        message: "user created successfully",
        status: true,
        newUser,
      })
    }catch(err){
      console.log("error", err);
      res.status(400).send({
        message: "user not created",
        status: false
      })
    }
  },
  login: async(req, res) => {
    // Steps to login api
    // 1. Get the email and password from request.
    // 2. Validate the email and password ( whether it is empty/undefined/null)
    // 3. Fetch the record from DB (database) that matches the email & password.
    // 4. Condition to check whether the record exists or not.
    // 5. Accordingly send the response to the client.
    try{
      const { email, password } = req.body;

      if(!email || !password){
        return res.status(400).send({
          message: 'Email or password is not valid',
          status: false
        });
      }

      const existingUser = await User.findOne({email});

      if(existingUser){
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if(isPasswordMatch){
          return res.status(200).send({
            message: 'Login Successful',
            status: true
          });
        }
      } 
      
      return res.status(200).send({
        message: 'Wrong Email or password',
        status: true
      });

    } catch(e){
      return res.status(400).send({
        message: 'Something went wrong!! Please try again later',
        status: false
      });
    }
    
  },
  follow: async(req, res) => {
    try{
      const {userId, followUserId } = req.body;
      const existingUser = await User.findById(userId);
      if(existingUser){
        const followUser = await User.findById(followUserId);
        if(followUser){
          const followObject = {
            userId: existingUser._id,
            name: existingUser.firstname,
            dateTime:"10/20/2019"
          }
          followUser.followers.unshift(followObject);
          await followUser.save();

          return res.status(200).send({
            message: 'followed successfully',
            status:true
          });
        }
      }

      return res.status(200).send({
          message: 'wrong ids',
          status:false
      });
    }catch(e){
      console.log(e);
      return res.status(400).send({
        message: 'something went wrong!!',
        status:false,
        error:e
    });

    }
  }
}

module.exports = userController;


// false null undefined 0 
// Query functions in mongodb
// Model.find()
// Model.updateOne()
// Model.updateMany()
// Model.deleteOne()
// Model.deleteMany()

// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndUpdate()
// Model.findOneAndDelete()
// Model.findOneAndUpdate()
// Model.findOneAndReplace()

// Authentication & Authorization

// Authentication
// 1. Users are having correct credentials. 
// 2. Then we will say that this user is authenticated (validated)

//  Authorization
// 1. control the access to multiple internal sub-sytems.
// 2. example 
// - students can't see the salary of teachers.
// - teachers can' see the other teachers salary.
// - Only admin should have rights to view the salary for teachers.

// Token
// Jwt (json web tokens) token 

// Create the jwt token  with some additional values.
// send it to the frontend 
// then frontend will send that in headers for all the apicalls being made.
//
