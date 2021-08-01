const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
	email: {type: String, unique: true, required: true},
	username: {type: String, unique: true, required: true},
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("user",userSchema)
module.exports = User