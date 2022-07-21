const express = require('express');
const { decHtml } = require('../Middlewares/decHTML');
const { checkLogin } = require('../Middlewares/loginController');
const { Tweet } = require('../Models/tweetModel');
const router = express.Router();

async function home(req,res){

const tweetFind =await   Tweet.find();
const tweets = tweetFind.reverse();

   res.render('Main2/home' , {
      user:tweets
   }) 
}

router.get('/home' , checkLogin , home )

module.exports = router;