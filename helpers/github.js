const request = require('request');
const requestPromise = require('request-promise');
const Promise = require('bluebird');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  var url = `https://api.github.com/users/${username}/repos`
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  debugger

  return requestPromise.get(options);
  //returns a promise

}

module.exports.getReposByUsername = getReposByUsername;
