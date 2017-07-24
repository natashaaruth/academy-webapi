




'use strict';
var app = require('../../server/server');
var codeGenerator = require("../utils/code-generator");

module.exports = function (Task) {
//   Task.taskProgress = function (id, cb)
//   {
//       console.log(id);
//       app.models.Task.findById(id, {include: 'assignments'},
//     function (err, tasks)
   
// {
//     if(err)
//         return cb(err);
//     else{
//         var totalActual = 0.0;
//         var totalElapsed = 0.0;
//         if(tasks.actual != 0)
//             totalActual =+ 1;
//         totalActual = totalActual.toFixed(0);

//         cb(null, totalActual);
//     };
// });
//   };

// Task.remoteMethod("taskProgress",
// {
//     accepts:
//     {
//         arg: 'id', type: 'string', required: true
//     },
//     http:
//     {
//         path: '/:id/assignment/actual', verb: "get", errorStatus: 401
//     },
//     returns: 
//     {
//         arg: "Actual", type:"object"
//     }
     
// });
//  Task.validatesUniquenessOf('code', { message: 'code already exists' });

//   Task.observe("before save", (context, next) => {
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

Task.getElapsedbyAssignment = function (id, cb)
{
    app.models.Assignment.find({where: {taskId: id}}, function (err, assignments){
    if(err || id === 0)
        return cb(err);
    else{
        console.log(assignments);
        var sum = assignments.reduce(function(last, d) {
            return d.elapsed + last;
        }, 0);
        cb(null, sum);
    }
})
};

Task.remoteMethod("getElapsedbyAssignment",
{
    accepts:[{arg: 'id', type: 'string', required: true}],
    http:{path: '/:id/actual', verb: "get", errorStatus: 401},
    returns:{arg: "Actual", type:"decimal"}})
};       
