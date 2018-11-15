const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
//add method of passport to User
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);