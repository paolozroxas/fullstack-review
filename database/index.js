var _ = require('underscore');
var Promise = require('bluebird');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

db.on('error', () => { console.error('failed to connect to database'); });
db.once('open', () => { console.log('connected to database'); })

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  owner: String,
  ownerAvatarUrl: String,
  url: String,
  updatedAt: Date,
  storedAt: Date
});

let Repo = mongoose.model('Repo', repoSchema);


//Database interface functions
let save = (jsonString) => {
  var repoObjs = JSON.parse(jsonString);
  var promises = _.map(repoObjs, (repoObj, index, repoObjs) => {

    var repoFields = {
      id: repoObj.id,
      name: repoObj.name,
      description: repoObj.description,
      owner: repoObj.owner.login,
      ownerAvatarUrl: repoObj.owner.avatar_url,
      url: repoObj.html_url,
      updatedAt: repoObj.updated_at,
      storedAt: Date.now()
    }

    return Repo.findOne({id: repoFields.id})
    .then((result) => {
      if (result) {
        console.log('repo already exists');
      } else {
        console.log('repo not present, will now save');
        let repo = new Repo(repoFields);
        return repo.save();
      }
    })
  });
  return Promise.all(promises);
};


let retrieve = () => {
  return Repo.find();
}

module.exports.save = save;
module.exports.retrieve = retrieve;
