/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Check if user is admin
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  if (! req.session.authenticated) {
    // Not logged in
    return res.unauthorized({error: 'Not logged in'});
  }

  User.findOne(req.session.userId).exec(function (err, user) {
    if (err) return res.negotiate(err);
    if (!user) {
      req.session.authenticated = false;
      req.session.userId = null;
      return res.unauthorized({error: 'Not logged in'});
    }

    if (user.isAdmin) return next(); // User is admin so continue
    return res.forbidden({error: 'You are not permitted to perform this action'});
  });

};
