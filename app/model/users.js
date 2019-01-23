'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Issues = new Schema({
  issue_title: '',
  issue_text : '',
  created_by : '',
  assigned_to: '',
  status_text: '',
  _id        : '',
  created_on : '',
  updated_on : '',
  open       : ''
});

Issues.set( 'toObject', {retainKeyOrder: true});
   
module.exports = mongoose.model('Issues', Issues);