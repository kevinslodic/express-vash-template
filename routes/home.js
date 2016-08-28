module.exports = function(router) {
  var HomeController = require('../controllers/home');

  router.get('/', HomeController.index);

  return router;
};