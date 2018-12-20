import config from '../config';
import HeyuCliService from './heyu-cli-service';
import SpawnWrapper from '../util/spawn-wrapper';

const heyuCliService = new HeyuCliService({
  spawnWrapper: new SpawnWrapper({
    executable: config.heyu.executable,
    bufferSize: config.heyu.stdout.buffer.size,
  }),
});

export { config, heyuCliService };
