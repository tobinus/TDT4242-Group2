/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * Log in a user
   */
  login: function (req, res) {
    // Find user and check password
    User.findOne({email: req.param('email')}, function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();
      user.checkPassword(req.param('password'), function (err, verified) {
        if (err) return res.negotiate(err);
        if (!verified) return res.forbidden();

        // Store as logged in
        req.session.userId = user.id;
        req.session.authenticated = true;
        return res.json(user);
      });
    });
  },

  /**
   * Log out the currently logged in user
   */
  logout: function (req, res) {
    req.session.userId = null;
    req.session.authenticated = false;
    return res.ok();
  },

};
