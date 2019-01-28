'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Issues = new Schema({
  project    : String,
  issue_title: String,
  issue_text : String,
  created_by : String,
  assigned_to: String,
  status_text: String,
  _id        : Number,
  created_on : Date,
  updated_on : Date,
  open       : Boolean
});

Issues.set( 'toObject', {retainKeyOrder: true});
   
module.exports = mongoose.model('Issues', Issues);