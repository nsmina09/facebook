
const db = require('./db.js');
const jwt = require('jsonwebtoken');
const { urlencoded } = require('express');

register = (fullname, gender, birthday, username, phoneNumber, password,) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            return {
                status: false,
                statusCode: 400,
                message: 'user already exist'
            }
        } else {
            const newUser = new db.User({
                fullname: fullname,
                gender: gender,
                birthday: birthday,
                username: username,
                phoneNumber: phoneNumber,
                password: password,
                islogged: false,
            });
            newUser.save();
            return {
                status: true,
                statusCode: 200,
                message: 'user registered successfully'
            }
        }
    })
}

login = (username, password) => {
    return db.User.findOne({ username })
        .then(user => {
            if (user) {
                if (user.password == password) {
                    const token = jwt.sign({ username: username }, 'chatapp');
                    user.islogged = true;
                    user.save();
                    return {
                        status: true,
                        statusCode: 200,
                        message: 'login successfully',
                        currentUser: user.username,
                    }
                } else {
                    return {
                        status: false,
                        statusCode: 400,
                        message: 'invalid password',
                    }
                }
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: 'user not registered',
                }
            }
        })
}

getUsersList = () => {
    return db.User.find().then(users => {
        if (users) {
            return {
                status: true,
                statusCode: 200,
                userlist: users
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                userlist: []
            }
        }
    })
}

getMyProfile = (username) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            return {
                status: true,
                statusCode: 200,
                you: user,
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'user not found',
            }
        }
    })
}

getOtherProfile = (username) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            return {
                status: true,
                statusCode: 200,
                other: user,
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'user not found',
            }
        }
    })
}

addPost = (username, fullname, text, imageurl, dateofPost) => {
    return db.Post.findOne({ username }).then(user => {
        if (user) {
            user.postImageUrls.push({
                posttext: text,
                imageurl: imageurl,
                dateofPost: dateofPost,
            });
            user.save();
            const post = db.Allpost({
                fullname: fullname,
                username: username,
                dateofPost: dateofPost,
                postText: text,
                PostImage: imageurl
            })
            post.save();
            return {
                status: true,
                statusCode: 200,
                message: 'user post added successfully'
            }
        } else {
            const newUser = db.Post({
                fullname: fullname,
                username: username,

                postImageUrls: [{
                    posttext: text,
                    imageurl: imageurl,
                    dateofPost: dateofPost,
                }]
            });
            const post = db.Allpost({
                fullname: fullname,
                username: username,
                dateofPost: dateofPost,
                postText: text,
                PostImage: imageurl
            })
            post.save();
            newUser.save();
            return {
                status: true,
                statusCode: 200,
                message: 'user post added successfully'
            }
        }
    })
}

getAllPost = () => {
    return db.Allpost.find().then(result => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                userandposts: result
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no posts to view'
            }
        }
    })
}

getMyPost = (username) => {
    return db.Post.findOne({ username }).then(result => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                mypost: result
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'invalid user'
            }
        }
    })
}

getOthersPost = (username) => {
    return db.Post.findOne({ username }).then(result => {
        if (result) {
            return {
                status: true,
                statusCode: 200,
                others: result
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'invalid user'
            }
        }
    })
}

logout = (username) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            user.islogged = false;
            user.save();
            return {
                status: true,
                statusCode: 200,
                message: 'user logged out successfully'
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'user not registered'
            }
        }
    })
}

addFriend = (fromusername, username, date, fromuser) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            user.notifications.push({
                fromuser: fromuser,
                fromfullname: fromusername,
                message: `${fromusername} sends you a friend request.`,
                date: date
            })
            user.save();
            const notification = db.Notification({
                username: username,
                fromusername: fromuser,
                fullname: fromusername,
                message: `${fromusername} sends you a friend request.`,
                date: date
            })
            notification.save();
            return {
                status: true,
                statusCode: 200,
                message: `request send to  ${user.fullname}`
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'user not found'
            }
        }
    })
}

getNotifications = (username) => {
    return db.Notification.find({ username }).then(user => {
        if (user) {
            return {
                status: true,
                statusCode: 200,
                notifications: user
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no notifications'
            }
        }
    })
}

//to delete accepted notification from server
deleterequest = (id) => {
    return db.Notification.deleteOne({ id }).then(notification => {
        if (notification) {

            return {
                status: true,
                statusCode: 200,
                notification: notification,
                message: 'request deletes successfully'
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no notification'
            }
        }
    })
}

confirmRequest = (username, fullname, otheruser) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            if (user.friends.includes({
                imageurl: '',
                fullname: fullname,
                username: otheruser
            })) {
                return {
                    status: false,
                    statusCode: 400,
                    message: ' user already found'
                }
            } else {
                user.friends.push({
                    imageurl: '',
                    fullname: fullname,
                    username: otheruser
                })
            }
            user.save();
            return {
                status: true,
                statusCode: 200,
                message: 'requst accepted'
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no user found'
            }
        }
    })
}

getFriends = (username) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            return {
                status: true,
                statusCode: 200,
                friends: user.friends
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no user found'
            }
        }
    })
}

addInfo = (username, bio, school, collage, place, maritalStatus, coverImage, profileImageUrl) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            // if (user.info.length == 0) {
            //     user.info.push({
            //         coverImage: coverImage,
            //         profileImageUrl: profileImageUrl,
            //         bio: bio,
            //         school: school,
            //         collage: collage,
            //         place: place,
            //         maritalStatus: maritalStatus,
            //     })
            // } else {
            user.info.pop();
            user.info.push({
                coverImage: coverImage,
                profileImageUrl: profileImageUrl,
                bio: bio,
                school: school,
                collage: collage,
                place: place,
                maritalStatus: maritalStatus,
            })
            user.save()
            // }
            return {
                status: true,
                statusCode: 200,
                message: 'profile updated successfully',
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no user found'
            }
        }
    })
}

getInfo = (username) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            return {
                status: true,
                statusCode: 200,
                info: user.info,
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no user found'
            }
        }
    })
}

alreadyFriend = (username, fullname, otheruser) => {
    return db.User.findOne({ username }).then(user => {
        if (user) {
            let checking = {
                imageurl: "",
                fullname: fullname,
                username: otheruser
            }

            let containes = user.friends.some(friend => {
                return JSON.stringify(friend) === JSON.stringify(checking)
            })
            if (containes) {
                console.log('yes');
                return {
                    status: true,
                    statusCode: 200,
                    alreadyFriend: true,
                }
            } else {
                console.log('no');
                return {
                    status: true,
                    statusCode: 200,
                    alreadyFriend: false,
                }
            }
        } else {
            return {
                status: false,
                statusCode: 400,
                message: 'no user found'
            }
        }
    })
}

module.exports = {
    register,
    login,
    getUsersList,
    getMyProfile,
    addPost,
    getAllPost,
    getMyPost,
    logout,
    getOtherProfile,
    getOthersPost,
    addFriend,
    getNotifications,
    confirmRequest,
    deleterequest,
    getFriends,
    addInfo,
    getInfo,
    alreadyFriend
};