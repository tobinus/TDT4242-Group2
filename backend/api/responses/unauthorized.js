/**
 * 401 (Unauthorized) Handler
 *
 * Usage:
 * return res.unauthorized();
 * return res.unauthorized(err);
 * return res.unauthorized(err, 'some/specific/unauthorized/view');
 *
 * e.g.:
 * ```
 * return res.unauthorized('Not logged in.');
 * ```
 */

module.exports = function unauthorized (data, options) {

  // Get access to `req`, `res`, & `sails`
  let req = this.req;
  let res = this.res;
  let sails = req._sails;

  // Set status code
  res.status(401);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 401 ("Unauthorized") response: \n',data);
  } else {
    sails.log.verbose('Sending 401 ("Unauthorized") response');

    // Default response message
    data = {error: 'Not logged in'};
  }

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data = undefined;
  }

  // Clear session in case of stale login data
  req.session.authenticated = false;
  req.session.userId = null;

  return res.json(data);

};

