'use strict';

var Issues = require('../model/issues.js');

function IssueHandler () {
  
  this.viewIssue = (req, res) => {
    console.log(req.query, req.params)
    Issues
    .find({})
    .exec( (err, result) => {
          if(err) throw err;
          console.log(result)
          });
    
  };

	this.submitIssue = function (req, res) {
    console.log(req.body)
		Issues
			.findOne({_id: /\d/})
			.exec(function (err, result) {
				if (err) { throw err; }
       console.log(result)
        let submit = new Issues(),
            project = req.body,
            id      = result ? result._id++ : 1001;
        
        submit.issue_title = project.issue_title;
        submit.issue_text  = project.issue_text;
        submit.created_by  = project.created_by;
        submit.assigned_to = project.assigned_to;
        submit.status_text = project.status_text;
        submit._id         = id;
        submit.created_on  = new Date(Date.now()).toString();
        submit.update_on   = null;
        submit.open        = true;
      //console.log(submit)
      submit.save( (err, success) => {
        if(err) return console.error(err);
        console.log(success)
        //res.json(success)
      });
				res.json(submit);
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