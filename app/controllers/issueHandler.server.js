'use strict';

var Issues = require('../model/issues.js');

function IssueHandler () {
  
  
  this.viewIssue = (req, res) => {
    var project = req.params['project'] !== '{}' ? req.params: {},
        query   = req.query;
   
    // add regex and options to query
    for(var key in query) {
      var val = query[key];
      val && key !== 'open' ? query[key] = { $regex: val, $options: 'i, m'} 
                            : query[key] = val;      
    }
    
    Issues 
      .find(project)
      .or([query])
      .select({project: 0})
      .sort({_id: -1})
      .exec( (err, result) => {
        if(err) throw err;
        
        return res.json(result)
      });
  };

	this.submitIssue = function (req, res) {
    console.log('submit is being called')
		Issues
			.find({_id: { $gte: 1000 } })
      .sort({_id: -1}) 
			.exec(function (err, result) {      
				if (err) throw err; 
       
        let submit  = new Issues(),
            project = req.body,
            id      = result[0]._id + 1;
        
        if( project.issue_title.length == 0 ||
            project.issue_text.length == 0 ||
            project.created_by == 0
          ) {
            return res.send('Missing required fields');
        }
        
        submit._id         = id;
        submit.project     = req.params.project;
        submit.issue_title = project.issue_title;
        submit.issue_text  = project.issue_text;
        submit.created_by  = project.created_by;
        submit.assigned_to = project.assigned_to;
        submit.status_text = project.status_text;
        submit.created_on  = new Date(Date.now()).toString();
        submit.updated_on  = submit.created_on;
        submit.open        = true;
         
        submit.save( err => {
          if(err) return console.error(err);

          Issues 
            .find({_id: id}).select({project: 0})
            .exec( (err, result) => {
              if(err) throw err;
              return res.json(result)
          });          
        });    
			})
	};

	this.updateIssue = function (req, res) {   
    console.log('an update"s been called');
   let project = req.body,
       conditions = {}, 
       updates = 0;
    
    for(var key in project) {
      var val = project[key];
    
      if(key !== '_id' && val) {     
        conditions[key] = val;
        updates++;
      }  
    }    
    
    if(updates) {
      conditions['updated_on'] = new Date(Date.now()).toString();
    } else {
       return res.send('no updated field sent') ;
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
          var message;
      
					err || !result ? message = 'could not update ' + project._id 
                         : message = 'successfully updated ' + project._id;
      
					return res.send(message);
				});
	};

	this.deleteIssue = function (req, res) {
    var id = req.body._id;
    // check if id is a number
    if(!Number.isInteger(parseInt(id)) ) return res.send('_id error');
      
		Issues
			.findOneAndDelete({_id: id})
			.exec(function (err, result) {
          var message = {};
					err || !result ? message['failed'] = 'could not delete ' + id
                         : message['success'] = 'deleted ' + id;
          
					return res.send(message);
				});
	};

}

module.exports = IssueHandler;