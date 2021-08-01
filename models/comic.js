const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
	title: String,
	description: String,
	image: String,
	publisherName: String,
	date: Date,
	distributerNo: Number,
	genre: String,
	color: Boolean,
	pageCount: Number,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String ,
	}
})

comicSchema.index({
	"$**":"text"
})

const Comic = mongoose.model("comic", comicSchema)

module.exports = Comic