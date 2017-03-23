'use strict';

module.exports = function enableAuthentication(app) {
  // enable authentication
  app.enableAuth();

  delete app.models.User.validations.email;

  var Account = app.models.Account;

  app.post("/authenticate", function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;
    var credential = { "username": username, "password": password };
    Account.login(credential, (err, token) => {
      if (err)
        next(err);
      else
        response.send(token);
    });
  })
};
