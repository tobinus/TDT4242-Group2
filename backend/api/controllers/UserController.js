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
      if (!user) return res.unauthorized({error:'Wrong e-mail or password'});
      user.checkPassword(req.param('password'), function (err, verified) {
        if (err) return res.negotiate(err);
        if (!verified) return res.unauthorized({error:'Wrong e-mail or password'});

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
    req.session.authenticated = false;
    req.session.userId = null;
    return res.ok({message: 'User logged out'});
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
        if (!user) return res.unauthorized();

        // Return details
        return res.json(user);
      });
    } else {
      return res.unauthorized();
    }
  },

  /**
   * Give a user admin privileges
   */
  makeAdmin: function (req, res) {
    User.update(parseInt(req.params.id), {isAdmin: true}).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound({error: 'User not found'});
      return res.json(user);
    });
  },

  /**
   * Remove a users admin privileges
   */
  removeAdmin: function (req, res) {
    User.update(parseInt(req.params.id), {isAdmin: false}).exec(function (err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound({error: 'User not found'});
      return res.json(user);
    });
  },

};
