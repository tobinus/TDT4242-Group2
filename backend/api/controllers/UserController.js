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
    User.findOne({email: req.param('email')}).exec(function (err, user) {
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
    return res.ok('Logged out');
  },

  /**
   * Get details for the currently logged in user, if any
   */
  current: function (req, res) {
    // Check if logged in
    if (req.session.authenticated && req.session.userId) {
      // Find user
      User.findOne(req.session.userId).exec(function (err, user) {
        if (err) return res.negotiate(err);
        if (!user) return res.notFound('User not found');

        // Return details
        return res.json(user);
      });
    } else {
      return res.notFound('Not logged in');
    }
  },

  /**
   * Give a user admin privileges
   */
  makeAdmin: function (req, res) {
    User.update(parseInt(req.params.id), {isAdmin: true}).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound('User not found');
      return res.ok('User updated');
    });
  },

  /**
   * Remove a users admin privileges
   */
  removeAdmin: function (req, res) {
    User.update(parseInt(req.params.id), {isAdmin: false}).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound('User not found');
      return res.ok('User updated');
    });
  },

};
