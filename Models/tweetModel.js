// import {Schema , model} from 'mongoose'
const {Schema ,model} = require("mongoose");
// import mongoose from 'mongoose'
// import createHttpError from 'http-errors';
const mongoose = require('mongoose');
const d = new Date();
const { People } = require('../Models/signupModel')
const todayDate = d.getDate() + "-"+  d.getMonth() +"-"+ d.getFullYear()
const { checkLogin } = require("../Middlewares/loginController");
const { verify } = require("jsonwebtoken");
const jwt = require('jsonwebtoken');
tweetSchema = new Schema ( {
    userName:String,
    tweet:String,
    date:String
    , userId: String
})

const Tweet = new model('Tweet'  , tweetSchema);

async function newTweet(req,res,next){
    let newPost;


    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    const token = cookies[process.env.cookieName];
    const decoded = jwt.verify(token , process.env.jwtSEC);

    const { userName , userId } = decoded;

    req.userName = userName;
    req.userId = userId;

    newPost = new Tweet({ userName:req.userName , tweet:req.body.tweetForm , date:todayDate , userId:req.userId});

 
    try {
        await newPost.save(); 
        // const tweets = await Tweet.find()
        const tweets=  await Tweet.find();
        // res.redirect('/')
        res.redirect('/home')
    
    } catch (error) {
       console.log(error) 

       res.status(500).send("Failed to post:(");
    }
}


module.exports = {  newTweet , Tweet  , tweetSchema }