'use strict';

module.exports = function (server) {
  var Project = server.models.Project;
  Project.nestRemoting("tasks")
};
