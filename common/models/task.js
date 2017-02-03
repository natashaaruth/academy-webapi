'use strict';

module.exports = function (Task) {
  Task.validatesUniquenessOf('code', { message: 'code already exists' });
};
