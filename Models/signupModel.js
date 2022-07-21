const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt');

const PeopleSchema = new Schema({
    userName : {
        type:String,
        require:true,
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    }
});

const People = new model('People' , PeopleSchema);
const bodyParser = require('body-parser')

const express = require("express")

const app = express()
const router= express.Router();
router.use(bodyParser.urlencoded({extended:true}))


const addUser = async (req,res) => {

    const hashPass =await bcrypt.hash(req.body.Security , 10)

    const exist= await People.findOne({userName:req.body.userName} ).select('userName').lean();

    if(exist){
        res.send("Sorry but this user name already exists!Please try another one sir:(")
    }
        else{
    const newUser = new People({
        userName:req.body.userName,
        Email:req.body.Email,
        // Password:req.body.Security
        Password:hashPass
    })



    try {
       await  newUser.save();
        res.status(200).render('createAccount')
    } catch (error) {
        res.status(500).json({
            errors:"Failed to create Account:("
        })
    }
}
}
module.exports = {
    PeopleSchema,
    People,
    addUser
}