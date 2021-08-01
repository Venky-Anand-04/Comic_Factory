const express = require("express")
const routes = express.Router()

//HOME ROUTE
routes.get("/",(req,res)=>{
	res.render("home.ejs")
})
//Acount Page ROUTE
routes.get("/account", isLoggedIn, (req,res) => {
	res.render("account")
})


//loggedin Function
function isLoggedIn(req, res, next){ 
	if (req.isAuthenticated()) {
		return next()
	} else{
		res.redirect("/login")
	}
}


module.exports = routes