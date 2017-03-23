'use strict';
var loopback = require('loopback');

module.exports = function enableAuthentication(app) {

    var Account = app.models.Account;
    var tokenMiddleware = (request, response, next) => {
        if (!request.accessToken) {
            request.status(401);
            request.send({
                'Error': 'Unauthorized',
                'Message': 'You need to be authenticated to access this endpoint'
            });
        }
        else {
            next();
        }
    }

    app.get("/api/me", tokenMiddleware, function (request, response, next) {
        app.models.Account.findById(request.accessToken.userId, function (err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('No user with this access token was found.'));
            response.send(user);
        });
    })
    app.get("/api/me/assignments", tokenMiddleware, function (request, response, next) {
        var userId = request.accessToken.userId;
        var filter = typeof request.query.filter === "string" ? JSON.parse(request.query.filter) : {};
        filter.where = {"and":[{accountId:userId}, filter.where]}
        var Assignment = app.models.Assignment;
        Assignment.find(filter, (err, assignments)=>{
            if(err)
            return next(err);

            response.send(assignments);
        }); 
    })
};
