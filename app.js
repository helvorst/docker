const express = require('express');
const bodyParser = require('body-parser');


module.exports.appFactory = function (playlistCollection, ObjectId) {
    const app = express();
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        const cursor = playlistCollection.find().toArray()
            .then(songs => {
                res.render('index.ejs', { songs });
            })
    });

    app.post('/play', (req, res) => {
        playlistCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(er => console.error(er));
    });

    app.put('/play', (req, res) => {
        playlistCollection.findOneAndUpdate(
            {
                "_id": ObjectId(req.body.id)
            },
            {
                $set: {
                    song: req.body.id + ' skipped'
                }
            },
            {
                upsert: true
            }
            )
            .then(result => res.json('success'))
            .catch(e => console.error(e));
    });

    app.delete('/play', (req, res) => {
        console.warn(req.body.id)
        playlistCollection.findOneAndDelete(
            {
                "_id": ObjectId(req.body.id),
            })
            .then(result => {
                console.log(result)
                res.json('deleted song')
            })
            .catch(e => console.error(e));
    });

    return app
}