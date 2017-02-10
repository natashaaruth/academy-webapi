'use strict';

module.exports = function (Account) {

  Account.observe('before save', function event(context, next) {
    var data = context.instance || context.data;
    data.emailVerified = true;
    next();
  });
};
