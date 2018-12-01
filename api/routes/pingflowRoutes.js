'use strict';


module.exports = function(app) {

  var ctrl = require('../controllers/pingflowControllers');

  app.route('/login')
  	.post(ctrl.login);

  app.route('/user')
    .post(ctrl.set_user)
	.get(ctrl.get_user);

  app.route('/cities')
  	.get(ctrl.get_cities)
    .post(ctrl.set_cities);

  app.route('/comments')
    .get(ctrl.get_comment)
    .post(ctrl.set_comment);

  // app.route('/tasks/:taskId')
  //   .get(pingflow.read_a_task)
  //   .put(pingflow.update_a_task)
  //   .delete(pingflow.delete_a_task);
};
