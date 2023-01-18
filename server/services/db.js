const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatapp');
const User = mongoose.model('User', {
    fullname: String,
    gender: String,
    birthday: Date,
    username: String,
    phoneNumber: Number,
    password: String,
    islogged: Boolean,
    info: [{
        coverImage: String,
        profileImageUrl: String,
        bio: String,
        school: String,
        collage: String,
        place: String,
        maritalStatus: String,
    }],
    friends: [],
    messages: {},
    notifications: []
});

const Post = mongoose.model('Post', {
    fullname: String,
    username: String,
    postImageUrls: [],
});

const Allpost = mongoose.model('Allpost', {
    fullname: String,
    dateofPost: Date,
    username: String,
    postText: String,
    PostImage: String
});
const Notification = mongoose.model('Notification', {
    username: String,
    fromusername: String,
    fullname: String,
    message: String,
    date: Date
})
module.exports = {
    User,
    Post,
    Allpost,
    Notification
};