const express = require("express")
const router = express.Router({mergeParams: true})
const Comment = require("../models/comment")
const Comic = require("../models/comic")
const isLoggedIn = require("../utils/isLoggedIn")
const checkCommentOwner = require("../utils/checkCommentOwner")
// COMMENT ROUTE
router.get("/new", isLoggedIn, (req,res)=>{
	res.render("comments_new.ejs",{comicId:req.params.id})
})
//COMMENT POST ROUTE
router.post("/", isLoggedIn, async (req,res)=>{
	try{
		const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username,
		},
		text: req.body.text,
		comicId: req.body.comicId,
		})
		req.flash("success", "Comment Created!")
		res.redirect(`/comics/${req.body.comicId}`)
	} catch(err) {
		console.log(err)
		req.flash("error","Error Creating Comment !")
		res.redirect("/comics")
	}
})

// COMMENT EDIT ROUTE
router.get("/:commentId/edit", checkCommentOwner, async (req,res)=>{
	try{
		const comic = await Comic.findById(req.params.id).exec()
		const comment = await Comment.findById(req.params.commentId).exec()
		console.log("Comics",comic)
		console.log("comment",comment)
		res.render("comments_edit.ejs",{comic,comment})
	} catch(err) {
		console.log(err)
		res.send("You Broke it...")
	}
})

//COMMENT UPDATE ROUTE
router.put("/:commentId", checkCommentOwner, async(req,res)=>{
	try{
		const comment = await Comment.findByIdAndUpdate(req.params.commentId,{text: req.body.text},{new:true}).exec()
		req.flash("success", "Comment Updated !!!")
		res.redirect(`/comics/${req.params.id}`)
		
	} catch(err) {
		console.log(err)
		req.flash("error", "Error Updating Comment!!!")
		res.redirect(`/comics/${req.params.id}`)
	}
})
//COMMENT DELETE ROUTE
router.delete("/:commentId", checkCommentOwner, async(req,res) =>{
	try{
		const deletecomment = await Comment.findByIdAndDelete(req.params.commentId)
		req.flash("success", "Comment Deleted!")
		res.redirect(`/comics/${req.params.id}`)
		
	} catch(err) {
		console.log(err)
		req.flash("error", "Error Deleting Comment!!")
		res.redirect(`/comics/${req.params.id}`)
	}
	
})



module.exports = router