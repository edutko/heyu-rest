'use strict';
module.exports = function(app) {
  var deviceController = require('../controllers/deviceController.js');

  app.route('/houses/:houseCode/units/:unitCode/state')
    .post(deviceController.setState)
    .get(deviceController.getState);
};

