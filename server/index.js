const express = require('express');
const app = express();
app.listen(3000, () => { });
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.json())
const dataservice = require('./services/dataservice.js');
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers.token;
        const data = jwt.verify(token, 'chatapp');
        next();
    } catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'please login to continue'
        })
    }
}

app.post('/register', (req, res) => {
    dataservice.register(
        req.body.fullname,
        req.body.gender,
        req.body.birthday,
        req.body.username,
        req.body.phoneNumber,
        req.body.password
    ).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.post('/login', (req, res) => {
    dataservice.login(
        req.body.username,
        req.body.password,
    ).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.get('/get-user-list', (req, res) => {
    dataservice.getUsersList().then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.get('/my-profile/:username', (req, res) => {
    dataservice.getMyProfile(req.params.username).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.post('/add-post', (req, res) => {
    dataservice.addPost(
        req.body.username,
        req.body.fullname,
        req.body.text,
        req.body.imageurl,
        req.body.dateofPost
    ).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.get('/home-feed', (req, res) => {
    dataservice.getAllPost().then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.get('/my-feed/:username', (req, res) => {
    dataservice.getMyPost(req.params.username).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.post('/logout', (req, res) => {
    dataservice.logout(req.body.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/others-profile', (req, res) => {
    dataservice.getOtherProfile(req.body.username).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.post('/others-post', (req, res) => {
    dataservice.getOthersPost(req.body.username).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.post('/add-friend', (req, res) => {
    dataservice.addFriend(
        req.body.fromusername,
        req.body.username,
        req.body.date,
        req.body.fromuser
    ).then(result => {
        res.status(result.statusCode).json(result);
    })
})

app.get('/notifications/:username', (req, res) => {
    dataservice.getNotifications(req.params.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.put('/confirm', (req, res) => {
    dataservice.confirmRequest(
        req.body.username,
        req.body.fullname,
        req.body.otheruser
    ).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    dataservice.deleterequest(req.params.id).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.get('/friends/:username', (req, res) => {
    dataservice.getFriends(req.params.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/add-info', (req, res) => {
    dataservice.addInfo(
        req.body.username,
        req.body.bio,
        req.body.school,
        req.body.collage,
        req.body.place,
        req.body.maritalStatus,
        req.body.coverImage,
        req.body.profileImageUrl,
    ).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.get('/get-info/:username', (req, res) => {
    dataservice.getInfo(req.params.username).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.post('/check-friend', (req, res) => {
    dataservice.alreadyFriend(req.body.username,
        req.body.fullname,
        req.body.otheruser).then(result => {
            res.status(result.statusCode).json(result)
        })
})