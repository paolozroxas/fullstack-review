const express = require('express');
let app = express();

let bodyParser = require('body-parser');

const helpers = require('../helpers/github.js');
const database = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.text());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('POST RECEIVED: ', req.body);

  helpers.getReposByUsername(req.body)
  .then((result) => {
    return database.save(result);
  }).catch((error) => { console.error(error); })
  .then((result) => {
    console.log('SAVED')
    res.send('OK');
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
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

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
