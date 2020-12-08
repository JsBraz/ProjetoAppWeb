const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');

require('dotenv').config({path: 'variables.env'});

const app = express();
const port = process.env.PORT || 3000;

let pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    encrypted: process.env.PUSHER_APP_SECURE,
    cluster: process.env.PUSHER_APP_CLUSTER,
});

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.status(200).send({service: 'Pusher activity feed API'});
});

// An in memory structure to prevent posts with duplicate titles
const locations = [];
let usersLocation = [];

app.post('/submit', (req, res) => {
    console.log("--> Submit");
    const id = req.body.id;
    const counter = req.body.counter;

    if (id === undefined) {
        res
            .status(400)
            .send({message: 'Please provide id', status: false});
        return;
    }

    if (counter === undefined) {
        res
            .status(400)
            .send({message: 'Please provide counter', status: false});
        return;
    }

    pusher.trigger('realtime-feeds', 'posts', {
        id: id,
        counter: counter,
    });

    res
        .status(200)
        .send({message: 'Post was successfully created', status: true});
});

app.post('/updateUsers', (req, res) => {
    console.log("--> UpdateUsers");
    const location = req.body.location;
    const userName = req.body.userName;

    if (location === undefined) {
        res
            .status(400)
            .send({message: 'Please provide location', status: false});
        return;
    }

    if (userName === undefined) {
        res
            .status(400)
            .send({message: 'Please provide userName', status: false});
        return;
    }
    let user = usersLocation.find(user => user.userName === userName);
    if (user === undefined){
        user = {
            "location": location,
            "userName": userName
        }
        usersLocation.push(user);

    } else if (user.userName === userName && user.location !== this.location){
        userIndex = usersLocation.findIndex(user => user.userName === userName)
        usersLocation[userIndex].location = location;
    }

    console.log(location, "<- Location - username ->", userName, " array: ", usersLocation);

    pusher.trigger('realtime-feeds', 'usersLocations', {
        userLocation: usersLocation
    });
    res
        .status(200)
        .send({message: 'Post was successfully created', status: true});
});

app.listen(port, function () {
    console.log(`API is running at ${port}`);
});
