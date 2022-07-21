const bcrypt =require('bcrypt')
const { Schema , model } = require('mongoose');
const { People } = require('./Models/signupModel');

const PeopleSchema = new Schema ({
    userName : {
        type : String,
        required : true ,
        trim : true ,
    } , 
    Email : {
        type : String ,
        required : true ,
        lowercase : true,
        trim : true,
    } , 

    Password : {
        type : String ,
        required : true
    }   ,
    Avatar : {
        type : String
    }
}); 


async function addUser ( req , res ,next) {
    let newUser;
    const hashPass = await bcrypt.hash( req.body.Security , 10);

  newUser = new People({
    userName:req.body.userName,
    Email:req.body.Email,
    Password:hashPass
  })
    try {
       await newUser.save();
        res.status(200).json({
            message : "User add successful!"
        })
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg:"Unknown error occured"
                }
            }
        })
    }
}
 

// module.exports = {
//     PeopleSchema ,
//     People,
//     validator,
//     addUser,
//     userValidatorDetection
// };