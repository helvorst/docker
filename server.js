const dotenv = require('dotenv').config();
const appFactory = require('./app').appFactory;

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const PORT = 8082;
const HOST = '0.0.0.0';
const mongoConnection = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.phy7g.mongodb.net/dev?retryWrites=true&w=majority`;


MongoClient.connect(mongoConnection, {
  useUnifiedTopology: true
})
  .then(client => {
    console.log('Connected to Mongo');
    const db = client.db('ishtar-audioteka');
    const playlistCollection = db.collection('playlist');

    const app = appFactory(playlistCollection, ObjectId);
    app.listen(PORT, HOST, () => {
      console.log(`Express is running on ${HOST}:${PORT}`);
    });

  })
  .catch(err => {
    console.error(err);
  });
