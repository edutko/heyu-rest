import { spawn } from 'child_process';

import log from './logger';

export default class SpawnWrapper {
  constructor({ executable, bufferSize = 100000 }) {
    this.executable = executable;
    this.bufferSize = bufferSize;
  }

  async spawn({ args, keepStdout }) {
    log.debug(`${this.executable} ${args.join(' ')}`);
    const child = spawn(this.executable, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    child.stderr.on('data', (data) => {
      log.warn(`[stderr]: ${data}`);
    });

    let output = '';
    if (keepStdout) {
      child.stdout.on('data', (data) => {
        const stringData = data.toString('utf8');
        if (output.length + stringData.length <= this.bufferSize) {
          output += stringData;
        }
      });
    }

    return new Promise((resolve, reject) => {
      let rejected = false;
      child.on('error', (err) => {
        rejected = true;
        log.error(`Failed to spawn process: ${err.message}`);
        reject(new Error('Failed to run command.'));
      });

      child.on('close', (code, signal) => {
        if (!rejected) {
          if (code !== null && code !== 0) {
            log.warn(`Command terminated abnormally (status: ${code})`);
          }
          if (signal !== null) {
            log.warn(`Command terminated abnormally (received signal: ${signal}`);
          }
          resolve({ code, signal, output });
        }
      });
    });
  }
}
