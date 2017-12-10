'use strict';

let heyu = require('../heyuCli.js');

exports.getState = function(req, res) {
  let houseCode = req.params.houseCode;
  let unitCode = req.params.unitCode;

  heyu.onState(houseCode, unitCode, function(error, onstate) {
    if (error) {
      res.status(500).json({ status: 500, message: error });
    } else {
      let state = (onstate ? "on" : "off");
      sendState(res, houseCode, unitCode, state);
    }
  });
};

exports.setState = function(req, res) {
  let houseCode = req.params.houseCode;
  let unitCode = req.params.unitCode;
  let state = req.body.state;

  if (state.match(/^on$/i)) {
    heyu.turnOn(houseCode, unitCode, function() {
      sendState(res, houseCode, unitCode, state);
    });

  } else if (state.match(/^off$/i)) {
    heyu.turnOff(houseCode, unitCode, function(error) {
      if (error) {
        res.status(500).json({ status: 500, message: error });
      } else {
        sendState(res, houseCode, unitCode, state);
      }
    });

  } else {
    res.status(400)
      .json({ status: 400, message: "Invalid state. Expected \"on\" or \"off\"" });
  }
};

function sendState(res, houseCode, unitCode, state) {
  res.status(200)
    .send({
      'houseCode': houseCode,
      'unitCode': unitCode,
      'state': state
    });
}

