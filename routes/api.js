/*
*
*
*       Complete the API routing below
*
*
*/

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
     
    })
    
    .post(function (req, res){
      var project = req.params.project;
      console.log('post', req.body)
    })
    
    .put(function (req, res){
      var project = req.params.project;
      console.log('put', req.body)
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      console.log('delete', req.body)
    });
    
};
