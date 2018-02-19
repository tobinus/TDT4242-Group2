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
    return forbidden();
  }

  User.findOne(req.session.userId).exec(function (err, user) {
    if (err) return res.negotiate(err);
    if (!user) return res.notFound();

    if (user.isAdmin) return next(); // User is admin so continue
    return forbidden();
  });

  function forbidden() {
    return res.forbidden('You are not permitted to perform this action.');
  }

};
