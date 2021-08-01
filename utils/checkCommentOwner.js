const Comment = require("../models/comment")


const CheckCommentOwner = async(req,res,next) => {
	if (req.isAuthenticated()) { // If Logged in , Check if they Own the Comment
		const comment = await Comment.findById(req.params.commentId).exec()
		
		if(comment.user.id.equals(req.user._id)) { // if the owner, Render the edit page
			next()
		} else {
			res.redirect("back")
		}
		
	} else {
		res.redirect("/login")
	}
	
}
module.exports = CheckCommentOwner

