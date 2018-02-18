const express = require('express');
let app = express();

let bodyParser = require('body-parser');

const helpers = require('../helpers/github.js');
const database = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use( bodyParser.json());

app.post('/repos', function (req, res) {

  console.log('POST RECEIVED: ', req.body.username);

  helpers.getReposByUsername(req.body.username)
  .then((result) => {
    return database.save(result);
  })
  .then((result) => {
    console.log('SAVED');
    res.send('OK');
  })
  .catch((error) => {
    console.error('error in saving to database:', error);
    res.status(500);
    res.send('error in saving to database');
  })

});

app.get('/repos', function (req, res) {
  database.retrieve()
  .then((result) => {
    result.sort((x, y) => {
      if (x.storedAt > y.storedAt) {
        return -1;
      } else if (x.storedAt < y.storedAt) {
        return 1;
      } else {
        return 0;
      }
    });
    res.send(result.slice(0, 25));
  })
});

app.options('/repos', function (req, res) {
  res.set({'Access-Control-Allow-Origin': '*'});
  res.send('OK options');
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
