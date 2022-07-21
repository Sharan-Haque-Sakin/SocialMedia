// External imports

const { compare } = require('bcrypt');
const express = require('express');
const mongoose = require("mongoose");


// Internal Imports

const { decHtml } = require('../Middlewares/decHTML');
const { findPeople, logOut, autoLogin } = require('../Middlewares/loginController');
const { People, PeopleSchema } = require('./../Models/signupModel')

const router = express.Router();

// Getting the login Page

function getLogin(req,res){
    res.render("index")
}


// Routes and Methods

router.get('/' , decHtml("Login"),  autoLogin ,getLogin)


router.delete('/' , logOut);


module.exports = router
