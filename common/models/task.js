'use strict';
var app = require('../../server/server');
var codeGenerator = require("../utils/code-generator");

module.exports = function (Task) {

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
