const Comic = require("../models/comic")
const Comment = require("../models/comment")



const comic_seeds = [
	{
		title: "Watchmen",
		description: "Watchmen is an American comic book maxiseries by the British creative team of writer Alan Moore, artist Dave Gibbons and colorist John Higgins. It was published by DC Comics in 1986 and 1987, and collected in a single volume edition in 1987.",
		image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Watchmen%2C_issue_1.jpg/220px-Watchmen%2C_issue_1.jpg",
		publisherName: "DC Comics",
		date: "2009-03-11",
		distributerNo: "98111",
		genre: "sci-fi",
		color: "true",
		pageCount: "32",
	},
	{
		title: "Peter Parker (Earth-616)",
		description: "Hope you were watching, Uncle Ben. 'Cause I did that for you. Kept everyone safe. Kept them from being scared. And I made it fun. It doesn't matter that most of 'em wouldn't have lifted a finger for Peter Parker.",
		image: "https://i.pinimg.com/originals/40/da/d8/40dad8cbc9b04c431dbf4c115ee9a69c.jpg",
		publisherName: "MARVEL Comics",
		date: "2021-06-03",
		distributerNo: "30474",
		genre: "sci-fi",
		color: "true",
		pageCount: "34",
	} ,
	{
		title: "Superman: For Tomorrow Part 1",
		description: "While testing a new metal compound in his fortress of Solitude, Superman finds evidence of a break-in. Who is the mysterious intruder in the Man of Steel’s Arctic lair?",
		image: "https://s3.amazonaws.com/comicgeeks/comics/covers/large-1491195.jpg",
		publisherName: "DC Comics",
		date: "2017-08-31",
		distributerNo: "977205437340954",
		genre: "sci-fi",
		color: "true",
		pageCount: "176",
	}
]


const seed = async () =>{
		// DELETING ALL THE DATA
		await Comic.deleteMany()
		console.log("Deleted All the Comics")
	
		await Comment.deleteMany()
		console.log(" Deleting All the Comments")
		// CREATING NEW DATA
	
		// for (const comic_seed of comic_seeds){
		// 	let comic = await Comic.create(comic_seed)
		// 	console.log("created new comic:", comic.title)
		// 	// CREATING SOME NEW COMMENTS
		// 	await Comment.create({
		// 		text:"This Book is Great",
		// 		user: "Mickey Mouse",
		// 		comicId: comic._id
		// 	})
		// 	console.log("Created new comment")
		// }

		
}




module.exports = seed