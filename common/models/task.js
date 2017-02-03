'use strict';

var app = require("../../server/server");

module.exports = function (Task) {
  Task.validatesUniquenessOf('code', { message: 'code already exists' });

  Task.observe("before save", (context, next) => {
    var Backlog = app.models.Backlog;
    var data = context.instance || context.data;

    Backlog.findById(data.backlogId, (err, backlog) => {
      if (err)
        return next(err);

      data.projectId = backlog.projectId;
      next();
    })
  })
};
