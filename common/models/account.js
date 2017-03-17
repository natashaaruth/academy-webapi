'use strict';
var app = require('../../server/server');
var async = require("async");

module.exports = function (Account) {

  // async.parallel({
  //   account: async.apply(initializeAccount)
  // }, (error, results) => {
  //   if (error) throw error;
  //   var account = results.account;
  //   createProfile(account)
  //   console.log('> models created sucessfully');
  // })

  Account.observe('before save', function event(context, next) {
    var data = context.instance || context.data;
    data.emailVerified = true;
    next();
  });

  Account.coba = function (username, password, email, profile, callback) {

    Account.create({
      realm: "moonlay",
      username: username,
      password: password,
      email: email
    }, (error, account) => {
      if (error)
        callback(error);

      var Profile = app.models.Profile;
      profile.accountId = account.id;
      Profile.create(profile, (error, profile) => {
        if (error) {
          Account.destroyById(account.id, () => {
            callback(error);
          });
        }
        else
          callback(null, {});
      })
    })
  };
  Account.remoteMethod(
    'coba',
    {
      accepts: [
        { arg: 'username', type: 'string' },
        { arg: 'password', type: 'string' },
        { arg: 'email', type: 'string' },
        { arg: 'profile', type: 'object' }
      ],
      http: {
        verb: "post",
        path: "/coba"
      },
      returns: { arg: 'Account', type: 'object' }
    }
  );
};
