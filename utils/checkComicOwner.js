const Comic = require("../models/comic")


const CheckComicOwner = async(req,res,next) => {
	if (req.isAuthenticated()) { // If Logged in , Check if they Own the comics
		const comic = await Comic.findById(req.params.id).exec()
		
		if(comic.owner.id.equals(req.user._id)) { // if the owner, Render the edit page
			next()
		} else {
			req.flash("error", "You don't have permission to do that!")
			res.redirect("back")
		}
		
	} else {
		req.flash("error", "You must be logged in to do that!")
		res.redirect("/login")
	}
	
}
module.exports = CheckComicOwner

