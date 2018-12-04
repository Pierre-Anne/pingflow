'use strict';


module.exports = function(app) {

  var init = require('../controllers/initControllers');
  var usresCtrl = require('../controllers/usersControllers');
  var optionsCtrl = require('../controllers/optionsControllers');
  var commentsCtrl = require('../controllers/commentsControllers');
  var favoritsCtrl = require('../controllers/favoritsControllers');
  var citiesCtrl = require('../controllers/citiesControllers');

  app.route('/login')
  	.post(usresCtrl.login);

  app.route('/user')
    .post(usresCtrl.set_user)
	.get(usresCtrl.get_users);

  app.route('/cities')
  	.get(citiesCtrl.get_cities)
    .post(citiesCtrl.set_cities);

  app.route('/comments')
    .options(optionsCtrl.options_validation)
    .get(commentsCtrl.get_comments)
    .post(commentsCtrl.set_comment);

  app.route('/favorits')
    .get(favoritsCtrl.get_favorits)
    .post(favoritsCtrl.set_favorit)
    .delete(favoritsCtrl.delete_favorit);
};
