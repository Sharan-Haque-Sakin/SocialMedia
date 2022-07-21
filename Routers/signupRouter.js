const express = require("express");
const { decHtml } = require("../Middlewares/decHTML");
const { addUser } = require("../Models/signupModel");
const router = express.Router();
const bodyParser = require('body-parser')

const app = express()

router.use(bodyParser.urlencoded({extended:true}))

function signupGet(res,res,next){
    res.render('signup');
}

router.get('/signup' , decHtml("Sign Up") ,signupGet);

// router.post('/signup' , addUser);

module.exports = router;