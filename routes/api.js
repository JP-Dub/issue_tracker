/*
*
*
*       Complete the API routing below
*
*
*/

var path = process.cwd();
var IssueHandler = require(path + '/app/controllers/issueHandler.server.js');

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {
  
  let issueHandler = new IssueHandler();

  app.route('/api/issues/:project')
  
    .get(issueHandler.viewIssue)
    
    
    .post((req, res) => {
      issueHandler.submitIssue(data =>  res.json(data));
    })
    
    
    .put(issueHandler.updateIssue)
    
    .delete(issueHandler.deleteIssue);
    
};
