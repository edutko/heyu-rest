import bodyParser from 'body-parser';
import { spawn } from 'child_process';
import express from 'express';
import fs from 'fs';

import { config } from './services/services';
import log from './util/logger';
import routes from './routes';

if (!fs.existsSync(config.heyu.engine.lockfile)) {
  spawn(config.heyu.executable, ['engine'], { detached: true });
}

const app = express();
app.use((req, res, next) => {
  const logReq = () => {
    log.child({ id: req.id }, true).info(`${req.headers['user-agent']} ${req.method} ${req.url} ${res.statusCode}`);
  };
  res.on('finish', logReq);
  res.on('close', logReq);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.use((req, res) => {
  res.status(404).json({ status: 404, message: `${req.originalUrl} not found` });
});

const port = process.env.PORT || config.http.port || 8080;
app.listen(port);
log.info(`Listening on port ${port}`);
