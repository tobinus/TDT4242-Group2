/**
 * isSelf
 *
 * @module      :: Policy
 * @description :: Check if the user is accessing its own data
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // Check if /api/user/:id == req.session.userId
  if (req.session.authenticated && parseInt(req.params.id) === req.session.userId) {
    return next();
  }

  // User is not allowed
  return res.forbidden('You are not permitted to perform this action.');
};
