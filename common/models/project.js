'use strict';

module.exports = function (Project) {
  Project.validatesUniquenessOf('code', { message: 'code already exists' });
};
