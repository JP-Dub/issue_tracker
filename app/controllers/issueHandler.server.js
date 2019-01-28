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
            //console.log('results', req.params, req.query)
            res.json(result)
           });
  };

	this.submitIssue = function (req, res) {
    console.log(req.params, req.query, req.body);
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
        submit.updated_on  = '';
        submit.open        = true;

        submit.save( (err, success) => {
          if(err) return console.error(err);
          res.json(success)
        });
				
			});
	};

	this.updateIssue = function (req, res) {   
   let project = req.body,
       conditions= {};
    
    for(var key in project) {
      var val = project[key];
      val ? conditions[key] = val : false;  
      conditions['updated_on'] = new Date(Date.now()).toString();
    }
   
		Issues
			.findOneAndUpdate({ 
        _id: project._id
        }, 
        conditions // object with fields to be updated
        ,{
        new : true
      })
			.exec(function (err, result) {
          var message = { update: '' };
      
					err ? message['update'] = 'could not update ' + project._id 
              : message['update'] = 'successfully updated ' + project._id;
					res.json(message);
				});
	};

	this.deleteIssue = function (req, res) {
    console.log(req.body, req.body._id, parseInt(req.body._id));
    var id = req.body._id;
    
    if(!Number.isInteger(parseInt(id)) ) return res.send('_id error');
      
		Issues
			.findOneAndDelete({_id: id})
			.exec(function (err, result) {
          var message = {};
					err || !result ? message['failed'] = 'could not delete ' + id
              : message['success'] = 'deleted ' + id;
          console.log(result)
					res.json(message);
				}
			);
	};

}

module.exports = IssueHandler;