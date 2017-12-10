let bodyParser = require('body-parser');
let child_process = require('child_process');
let config = require('./config.js');
let express = require('express');
let fs = require('fs');
let multer = require('multer');

if (!fs.existsSync(config.config.heyu.engine.lockfile)) {
  child_process.spawn(config.config.heyu.executable, ['engine'], { detached: true });
}

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let routes = require('./routes/basicRoutes.js');
routes(app);

app.use(function(req, res) {
  res.status(404).json({ status: 404, message: req.originalUrl + ' not found' })
});

let port = config.port || process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port ' + port);

