


'use strict';
var app = require('../../server/server');
var codeGenerator = require ("../utils/code-generator");

module.exports = function(Assignment) {
    Assignment.assignmentProgress = function (id, cb)
    {
        console.log(id);
        app.models.Assignment.findById(id, {include: 'timerecords'},
        function (err, assignments)
        {
            if(err)
                return cb(err);
            else{
                var totalPersentasi = 0.0;
             //   var totalDuration = 0.0; 
                if(assignments.budget != 0 )               
                    totalPersentasi = ((assignments.elapsed/(assignments.budget*3600))*100);
                totalPersentasi =  totalPersentasi.toFixed(4);
                // console.log("Total Persentasi : "+ totalPersentasi);
                cb(null,  totalPersentasi);
            };
        });

};

Assignment.remoteMethod("assignmentProgress",
{
    accepts:
    {
        arg: 'id', type: 'string', required: true},
        http:{path: '/:id/persentasi', verb: "get", errorStatus: 401},
        returns: {arg: "Persentasi", type: "object"}
    });

Assignment.validatesUniquenessOf('code', { message: 'code already exists' });

//   Assignment.observe("before save", (context, next) => {
//     var Backlog = app.models.Backlog;
//     var data = context.instance || context.data;

//     if (context.isNewInstance) {
//       data.code = codeGenerator();
//       Backlog.findById(data.backlogId, (err, backlog) => {
//         if (err)
//           return next(err);
//         data.backlogId = backlog.id;
//         data.projectId = backlog.projectId;
//       })
//     }
//     next();
//   })
          };
