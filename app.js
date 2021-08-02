//========================================================================
//NPM IMPORTS
//========================================================================

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const morgan = require("morgan")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const expressSession = require("express-session")

//Config IMPORTS
let config
try{
	config = require("./config")
	
} catch (err) {
	console.log("could not import config. This means you are not working locally")
	console.log(err)
}


//router IMPORTS
const homeRoute = require("./router/main_route")
const comicRoutes = require("./router/comics_route")
const commentRoute = require("./router/comments_route")
const authRoute = require("./router/auth_route")

//models IMPORTS
const Comic = require("./models/comic")
const Comment = require("./models/comment")
const User = require("./models/user")
//========================================================================
//DEVELOPMENTS
//========================================================================
//SEEDING THE DATABASE =====

 // const seed = require("./utils/seed")
 // seed();

//Mongoose MongoDB Connection from Config.js
try{
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
	
} catch(e) {
	console.log("could not connect using config, Which means you are not running locally")
	mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
}

//========================================================================
//Boilerplates
//========================================================================

//Body Process Config ======
app.use(bodyParser.urlencoded({extended:true}))
//ViewEngine EJS =====
app.set("view engine","ejs")
//Method Override Config =======
app.use(methodOverride('_method'))
//morgan for logging
app.use(morgan("dev"))

// Express css ========
app.use(express.static("public"))
//ExpressSession =======
app.use(expressSession({
	secret: process.env.ES_SECRET || config.ES.secret ,
	resave: false,
	saveUninitialized: false,
}))
//Flash Config ==================
app.use(flash())
// Passport Config ==============
app.use(passport.initialize())
app.use(passport.session())   //Allows Persistant Session
passport.serializeUser(User.serializeUser())   //What data should be stored in session
passport.deserializeUser(User.deserializeUser())  // Get the user data from stored session
passport.use(new localStrategy(User.authenticate())) //Using the Local Stratergy

// State Config ==================
app.use((req, res, next) => {
	res.locals.user = req.user
	res.locals.successMessage = req.flash("success")
	res.locals.errorMessage = req.flash("error")
	next()
})


//CREATING ROUTES
//========================================================================
//Using ROUTES
//========================================================================
//Home Route
app.use("/",homeRoute)
//Auth Route
app.use("/",authRoute)
//Comic Route
app.use("/comics",comicRoutes)
//Comment Route
app.use("/comics/:id/comments",commentRoute)


//Listening Port
app.listen(process.env.PORT || 3000 ,()=>{
	console.log("server is running...")
})