const request = require('request');
const requestPromise = require('request-promise');
const Promise = require('bluebird');

if(process.env.GITHUB_API_KEY) {
  var config = {TOKEN: process.env.GITHUB_API_KEY};
} else {
  var config = require('../config.js');
}

console.log('config is ', config);

let getReposByUsername = (username) => {

  var url = `https://api.github.com/users/${username}/repos`
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  return requestPromise.get(options);
  //returns a promise

}

module.exports.getReposByUsername = getReposByUsername;
