'use strict';

var Issues = require('../model/issues.js');

function IssueHandler () {
  
  function createConditions(project, object) {
    for(var key in project) {
      var val = project[key];
      val ? object[key] = val : false;  
      object['updated_on'] = new Date(Date.now()).toString();
      return object;
    }
  }
  
  this.viewIssue = (req, res) => {
    let project = req.params.project,
        query   = req.query;
    console.log({issue_title: project}, query)
    //let conditions = createConditions(project, {});
    //console.log(conditions);
    Issues //{ _id: { $gte: 1000 }}
      .find({})
      .or([project, query])
      .select({issue_title : 1, created_by: 1, issue_text: 1, assigned_to: 1, status_text: 1, created_on: 1, updated_on: 1, open: 1, _id: 1})
      .sort({_id: -1})
      .exec( (err, result) => {
            if(err) throw err;
        
            return res.json(result)
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
        submit.updated_on  = submit.created_on;
        submit.open        = true;

        submit.save( (err, success) => {
          if(err) return console.error(err);
          return res.json(success)
        });
				
			});
	};

	this.updateIssue = function (req, res) {   
   let project = req.body,
       conditions = {};
    
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
      
					err || !result ? message['update'] = 'could not update ' + project._id 
                         : message['update'] = 'successfully updated ' + project._id;
      
					return res.json(message);
				});
	};

	this.deleteIssue = function (req, res) {
    var id = req.body._id;
    
    if(!Number.isInteger(parseInt(id)) ) return res.send('_id error');
      
		Issues
			.findOneAndDelete({_id: id})
			.exec(function (err, result) {
          var message = {};
					err || !result ? message['failed'] = 'could not delete ' + id
                         : message['success'] = 'deleted ' + id;
          
					return res.json(message);
				}
			);
	};

}

module.exports = IssueHandler;