// External Imports

const bodyParser = require('body-parser')
const express = require('express');
const mongoose = require("mongoose");
const CookieParser = require('cookie-parser')

// Internal Imports

const loginRouter = require('./Routers/loginRouter');
const signupRouter = require('./Routers/signupRouter')
const homeRouter = require('./Routers/homeRouter');
const {  defaultHandler , notFoundHandler} = require('./Middlewares/errorHanlders');
const { addUser } = require('./Models/signupModel');
const { findPeople, logOut } = require('./Middlewares/loginController');
const cookieParser = require('cookie-parser');
const tweetRouter = require('./Routers/tweetRouter');
const { newTweet } = require('./Models/tweetModel');
const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.json());

require('dotenv').config();
app.use(cookieParser(process.env.cookieSec))


app.set('view engine' , 'ejs');

mongoose.connect(process.env.Mongoose)
.then(() => console.log("Mongoose is connected!"))
.catch( err => console.log(err));

app.use(express.static('public'))

app.get('/' , loginRouter);

app.get('/signup' , signupRouter)
app.get('/home' , homeRouter);
app.get('/tweet' , tweetRouter )
app.post('/signup' , addUser)
app.post('/' , findPeople)
app.post('/tweet' , newTweet)
app.delete('/home' , logOut)

app.get('/logout' , (req,res) => {
    res.cookie(process.env.cookieName , '' )
    res.redirect('/')
})
//                      Error Handlers

// app.use(notFoundHandler)
app.use(defaultHandler)

app.listen(80 , () => {
    console.log("Server is listening to port 80");
});