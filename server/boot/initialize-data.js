'use strict';
var async = require("async");

module.exports = function initializeData(app) {
  var mongoDs = app.dataSources["mongodb-ds"];

  async.parallel({
    accounts: async.apply(initializeAccount)
  }, (error, results) => {
    if (error) throw error;

    console.log('> models created sucessfully');
  })

  function initializeAccount(callback) {
    mongoDs.automigrate("Account", function (error) {
      if (error)
        callback(error);

      var Account = app.models.Account;
      var query = { "where": { username: "academy" } };

      Account.findOne(query, (error, user) => {
        if (!user) {
          Account.create({
            realm: "moonlay",
            username: "academy",
            password: "Standar123",
            email: "academy@moonlay.com"
          }, (error, user) => {
            if (error)
              callback(error);
          })
        }
      })
    });
  }

};
