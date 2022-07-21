const { checkLogin } = require('../Middlewares/loginController');

// import {newTweet,  tweetSchema , Tweet} from './../Models/tweetModel'
const {newTweet} = require('../Models/tweetModel')
const router=  require('express').Router();

function tweetPostGet(req,res){
    res.render('Main2/tweetpost')
}





router.get('/tweet' , checkLogin , tweetPostGet  )

router.post('/tweet' ,newTweet )

module.exports = router