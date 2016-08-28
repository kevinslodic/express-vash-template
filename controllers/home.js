module.exports = {
  index: function(req, res, next) {
    req.app.locals.renderView('home', req, res);
  },
}