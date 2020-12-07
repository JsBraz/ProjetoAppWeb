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

app.post('/submit', (req, res) => {
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

    const index = locations.findIndex(element => {
        return element === id;
    });

    if (index >= 0) {
        location = locations.find(element => {
            return element === id;
        });
        pusher.trigger('realtime-feeds', 'posts', {
            id: id,
            counter: counter,
        });
        res
            .status(200)
            .send({message: 'Post was successfully created', status: true});
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

app.listen(port, function () {
    console.log(`API is running at ${port}`);
});
