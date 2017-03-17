'use strict';

module.exports = function (Project) {
  // Project.validatesPresenceOf('name');
  Project.validatesUniquenessOf('code');
};
