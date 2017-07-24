'use strict';
var app = require('../../server/server');

module.exports = function(Timerecord) {
  Timerecord.getPropertyTask = function (idTask, cb)
{
    app.models.Task.find({
        include: {
            relation: 'assignments',
            scope: {
                relation:'timerecords',
                scope:{
                    where:{
                        assignmentId: idTask,
                        // name: nameTask, 
                        // remark: remarkTask, 
                        // description: descriptionTask
                    }
                }
            }
        }
    },function (err, timerecords){ 
    if(err || idTask === 0 )
        return cb(err);
    else{
        console.log(timerecords);
        // console.log("ini name" +nameTask);
        cb(null, timerecords);
    }
})
};

Timerecord.remoteMethod("getPropertyTask",
{
    accepts:
    [
        {
            arg: 'idTask',
            description: 'Task Id', 
            type: 'string', 
            required: true
        }
    ],
    http:
    [
        {
            path: '/:idTask/PropertyTask', 
            verb: "get", 
            errorStatus: 401
        }
        // ,
        // {
        //     path: '/task/:remarkTask/timerecords', 
        //     verb: "get", 
        //     errorStatus: 401
        // },
        // {
        //     path: '/task/:descriptionTask/timerecord', 
        //     verb: "get", 
        //     errorStatus: 401
        // }
    ],
    returns:
    [
        {
            arg: "name", 
            type:"string"
        }
        // ,
        // {
            
        //     arg: "remark", 
        //     type:"object"
        // },
        // {
        //     arg: "description", 
        //     type:"object"
        // }
    ]})
};       
