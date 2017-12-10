'use strict';

let child_process = require('child_process');
let config = require('./config.js');
let heyuExe = config.config.heyu.executable;

function heyuCommand(args, callback) {
  if (config.config.debug) {
    console.log(heyuExe + " " + args.join(" "));
  }

  child_process.execFile(heyuExe, args, {}, function(error, stdout, stderr) {
    if (config.config.debug && stdout) {
      console.log(stdout);
    }

    if (error) {
      if (stderr) {
        console.log(stderr);
      }
      console.log("Exit status: " + error.code);
    }

    callback(error, stdout, stderr);
  });
};

function heyuDeviceCommand(command, houseCode, unitCode, callback) {
  heyuCommand([command, String(houseCode) + String(unitCode)], callback);
};

exports.turnOn = function(houseCode, unitCode, callback) {
  heyuDeviceCommand("on", houseCode, unitCode, function(error, stdout, stderr) {
    if (error) {
      callback("Failed to change device state.");
    } else {
      callback(null);
    }
  });
};

exports.turnOff = function(houseCode, unitCode, callback) {
  heyuDeviceCommand("off", houseCode, unitCode, function(error, stdout, stderr) {
    if (error) {
      callback("Failed to change device state.");
    } else {
      callback(null);
    }
  });
};

exports.onState = function(houseCode, unitCode, callback) {
  heyuDeviceCommand("onstate", houseCode, unitCode, function(error, stdout, stderr) {
    if (error) {
      callback("Failed to retrieve device state.", null);
    } else {
      let onState = parseInt(stdout);
      callback(null, onState);
    }
  });
};

