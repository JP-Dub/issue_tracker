'use strict';

var Issues = require('../model/issues.js');

function IssueHandler () {
  
  this.viewIssue = (req, res) => {
    Issues
    .find({})
    .exec( (err, result) => {
          if(err) throw err;
          console.log(result)
          });
    
  };

	this.submitIssue = function (req, res) {
    
		Issues
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json();
			});
	};

	this.updateIssue = function (req, res) {
		Issues
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.deleteIssue = function (req, res) {
		Issues
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

}

module.exports = IssueHandler;