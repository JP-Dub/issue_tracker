'use strict';

var Issues = require('../model/issues.js');

function IssueHandler () {
  
  this.viewIssue = (req, res) => {
    let project = req.params.project,
        query   = req.query;
    
    Issues
      .find({ _id: { $gte: 1000 }//,
            //issue_title: project || null,
            //created_by: query.created_by || null
            })
      .sort({_id: -1})
      .exec( (err, result) => {
            if(err) throw err;
            console.log('results', req.params, req.query)
            res.json(result)
           });
  };

	this.submitIssue = function (req, res) {

		Issues
			.find({_id: { $gte: 1000 } })
      .sort({_id: -1})
			.exec(function (err, result) {
				if (err) { throw err; }
   
        let submit  = new Issues(),
            project = req.body,
            id      = result[0]._id + 1;
        
        submit.issue_title = project.issue_title;
        submit.issue_text  = project.issue_text;
        submit.created_by  = project.created_by;
        submit.assigned_to = project.assigned_to;
        submit.status_text = project.status_text;
        submit._id         = id;
        submit.created_on  = new Date(Date.now()).toString();
        submit.open        = true;

        submit.save( (err, success) => {
          if(err) return console.error(err);
          res.json(success)
        });
				
			});
	};

	this.updateIssue = function (req, res) {
    console.log(req.body)
   let project = req.body,
       condition = {};
    
   
		Issues
      //.find({ _id: req.body._id})
			.findOneAndUpdate({ 
        _id: project._id
        },{
        // issue_title: project.issue_title,
        // issue_text: project.issue_text,
        // created_by: project.created_by,
        // assigned_to: project.assigned_to,
        // status_text: project.status_text,
        open: false, 
        updated_on: new Date(Date.now()).toString()
        },{
        upsert: true
      })
			.exec(function (err, result) {
					if (err) { throw err; }
            //console.log(result)
					res.json(result);
				}
			);
	};

	this.deleteIssue = function (req, res) {
		Issues
			.findOneAndDelete({_id: req.body._id})
			.exec(function (err, result) {
					if (err) throw err; 

					res.json(result);
				}
			);
	};

}

module.exports = IssueHandler;