export default {
  http: {
    port: 8080,
  },
  heyu: {
    executable: '/opt/heyu-2.11-rc3/bin/heyu',
    engine: { lockfile: '/var/lock/LCK..heyu.engine.ttyUSB0' },
    stdout: { buffer: { size: 1000000 } },
  },
};
