const express =  require('express')
const {tweetSchema , Tweet}  = require('../Models/tweetModel')
const { People , PeopleSchema} = require('./../Models/signupModel')
const { compare } = require('bcrypt')
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken'); 
const { sign } = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { resolveInclude } = require('ejs');

// Login Method

    async function findPeople(req,res){

                    try {
     const anyUserName = await People.find({   userName:req.body.userName })
        
        if(anyUserName){
            let userPass = anyUserName[0].Password;
      
            const isValidPass = await compare(req.body.Security , userPass)

            if(isValidPass){
                const token = sign({ userName:anyUserName[0].userName , userId: anyUserName[0]._id} , process.env.jwtSEC); 
                res.cookie( process.env.cookieName , token ,{ httpOnly:true , signed: true})

                const tweets = await Tweet.find();
                    res.redirect('/home');



               
            } else{
                res.status(401).json({ errors : "Invalid Password"})
            }
        
        } else{
            res.status(401).json({ errors : "Sorry but no such User Name available:("})
        }
        
           
            } catch (error) {
                res.status(500).json({ errors : "Something went wrong"})       
                console.log(error)
            }
    }

//              Check Login

const checkLogin = (req,res,next) => {
    
    let cookies = 
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
    if(cookies){

        try {
         token = cookies[process.env.cookieName]       
            const decoded = jwt.verify(token , process.env.jwtSEC )
                const {userName , userId} = decoded;
                req.userId = userId
                req.userName = userName
            // console.log(userId + " " + userName)
            req.user = decoded;
            
            if(res.locals.html){
                res.locals.loggedInUser = decoded;
            }
            next();
        } catch (error) {
            if(res.locals.html){
                res.redirect('/');
            }else{
                res.status(500).json({ errors : "authorization Failded:( "})
            }
            console.log(error)
        }
    } else{
        if(!res.locals.html){
            res.redirect('/');

        }
        else{
            res.status(500).json({ errors : "Authorization failed!"})
        }
    }
}

// Auto Login

const autoLogin =async (req,res,next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    
    if(!cookies){
        next();
    }
    else{
        res.redirect('/home')
    }
}


    // log out 
    function logOut(req,res){
        res.clearCookie();
        res.send("Your are Logged out")
    }
module.exports = {
    findPeople,
    logOut
    ,
    checkLogin,
    autoLogin
    
}