import SpawnWrapper from '../../src/util/spawn-wrapper';

describe('spawn-wrapper', () => {
  const bufferSize = 1000;
  let spawnWrapper;

  beforeEach(() => {
    spawnWrapper = new SpawnWrapper({ executable: 'node', bufferSize });
  });

  describe('spawn', () => {
    it('captures stdout from the spawned process when keepStdout is true', async () => {
      const result = await spawnWrapper.spawn({ args: ['-e', 'process.stdout.write("foobar");'], keepStdout: true });
      expect(result.code).toBe(0);
      expect(result.output).toBe('foobar');
    });

    it('ignores stderr form the spawned process', async () => {
      const result = await spawnWrapper.spawn({
        args: ['-e', 'process.stderr.write("An error message.");'],
        keepStdout: true,
      });
      expect(result.output).toBe('');
    });

    it('truncates the output when it is too large', async () => {
      let expectedOutput = '';
      for (let i = 0; i < bufferSize; i += 1) {
        expectedOutput += 'a';
      }
      const result = await spawnWrapper.spawn({
        args: ['-e', 'for (let i = 0; i < 2000; i++) process.stdout.write("a");'],
        keepStdout: true,
      });
      expect(result.output).toBe(expectedOutput);
    });

    it('captures the exit status of the spawned process', async () => {
      const result = await spawnWrapper.spawn({
        args: ['-e', 'invalid javascript'],
        keepStdout: true,
      });
      expect(result.code).not.toBe(0);
    });
  });
});
