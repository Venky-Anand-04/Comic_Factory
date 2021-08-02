 const isLoggedIn = (req, res, next) =>{ 
	if (req.isAuthenticated()) {
		return next()
	} else{
		req.flash("error","Heyy!!, You must be logged in to do that!.")
		res.redirect("/login")
	}
}

 module.exports = isLoggedIn