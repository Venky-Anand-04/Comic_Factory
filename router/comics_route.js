const express = require("express")
const router = express.Router()
const Comic = require("../models/comic")
const Comment = require("../models/comment")
const isLoggedIn = require("../utils/isLoggedIn")
const checkComicOwner = require("../utils/checkComicOwner")

//COMIC PAGE ROUTE
router.get("/",async (req,res)=>{
	try{
		const comics = await Comic.find().exec();
		res.render("comics.ejs",{comics})
	} catch(err) {
		console.log(err)
		res.send("you broke it... /index")
	}
	
	})
//COMIC POST ROUTE
router.post("/", isLoggedIn, async (req,res)=>{
	const genre = req.body.genre.toLowerCase()
	const newComic = {
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
		date:req.body.date,
		publiserName: req.body.publisherName,
		distributerNo:req.body.distributerNo,
		genre,
		color: !!req.body.color,
		pageCount:req.body.pageCount,
		owner: {
			id: req.user._id,
			username: req.user.username,
		}
	}
	try{
		const comic = await Comic.create(newComic)
		req.flash("success","Comic Created !!!")
		res.redirect("/comics/" + comic._id)
	} catch(err) {
		console.log(err)
		req.flash("error", "Error Creating Comic")
		res.redirect("/")
	}
	
})
//COMIC/NEW  ROUTE
router.get("/new", isLoggedIn, (req,res)=>{
	res.render("comics_new.ejs")
})

//COMIC SEARCH 
router.get("/search", async(req,res) =>{
	try{
		const comics = await Comic.find({
		$text: {
			$search: req.query.keyword
		}
	})
		res.render("comics.ejs",{comics})
	} catch(err) {
		console.log(err)
	}
	
})
// COMIC GENRE ROUTE
router.get("/genre/:genre", async(req,res) =>{
	const validgenres = ["anime", "manga", "sci-fi", "thriller", "horrer"]
	if (validgenres.includes(req.params.genre.toLowerCase())) {
		const comics = await Comic.find({genre: req.params.genre}).exec()
		res.render("comics",{comics})
	} else{
		res.send("please enter a Valid Comic Genre")
	}
})

//COMIC SHOW ROUTE
router.get("/:id", async (req,res)=>{
	try{
		const comic = await Comic.findById(req.params.id).exec()
		const comments = await Comment.find({comicId: req.params.id})
		res.render("comics_show.ejs", {comic,comments})
	} catch(err){
		console.log(err)
		res.send("You did mistake !!!!! /comics")
	}
	
})

//COMIC EDIT PAGE
router.get("/:id/edit", checkComicOwner, async (req,res)=>{
	//get the comics 
	 try{
	 	const comic = await Comic.findById(req.params.id).exec()
	 	res.render("comics_edit",{comic})
	 } catch(err){
	 	console.log(err)
		req.send("there is an error ...!!! /")
	 }

	
	
})
//COMIC EDIT AND UPDATE PAGE
router.put("/:id", checkComicOwner, async (req,res) =>{
	const genre = req.body.genre.toLowerCase()
	const comic = {
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
		date:req.body.date,
		publiserName: req.body.publisherName,
		distributerNo:req.body.distributerNo,
		genre,
		color: !!req.body.color,
		pageCount:req.body.pageCount
	}
	try{
		const updatedComics = await Comic.findByIdAndUpdate(req.params.id,comic,{new: true}).exec()
		req.flash("success","Comic Updated!!!")
		res.redirect(`/comics/${req.params.id}`)
	} catch(err) {
		console.log(err)
		req.flash("error","Error Updating Comic")
		res.send("There ia an issue")
	}
})
//COMIC DELETE
router.delete("/:id", checkComicOwner, async (req,res)=>{
	try{
		const deletedComic = await Comic.findByIdAndRemove(req.params.id).exec()
		req.flash("success","Comic Deleted!!!")
		res.redirect("/comics")
	} catch(err) {
		console.log(err)
		req.flash("Error Deleting Comic!!!")
		res.redirect("back")
	}
	
})



//EXPORTING THIS MODULE
module.exports = router