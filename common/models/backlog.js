'use strict';
var app = require('../../server/server');

module.exports = function (Backlog) {
  Backlog.validatesUniquenessOf('code', { message: 'code already exists' });
};
