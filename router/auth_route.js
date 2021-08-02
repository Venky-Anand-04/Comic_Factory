const express = require("express")
const router = express.Router()
const User = require("../models/user")
const passport = require("passport")

// Sign Up New ===========
router.get("/signup", (req,res) => {
	res.render("signup")
})
// Sign Up Create ========
router.post("/signup", async (req,res) => {
	try{
		const newUser = await User.register({
		email: req.body.email,
		username: req.body.username,
		}, req.body.password)
	
		req.flash("success", `Signed you up as ${newUser.username}`)
		
		passport.authenticate("local")(req, res, ()=> {
			res.redirect("/comics")
		})
		
	} catch(err) {
		console.log("Error",err)
	}	
})

// Login Show Form =======
router.get("/login",(req,res)=>{
	res.render("login")
	req.flash("success", "Logged in Successfully!")
})
// Login route ========
router.post("/login", passport.authenticate("local", {
	successRedirect: "/comics",
	failureRedirect: "/login",
	failureFlash: true,
	successFlash: "Logged in Successfully!!!"
}))

//LogOut route ==========
router.get("/logout", (req,res)=>{
	req.logout()
	req.flash("success","Logged out Successfully!!!")
	res.redirect("/comics")
})

module.exports = router