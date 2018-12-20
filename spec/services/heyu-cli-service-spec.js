import HeyuCliService from '../../src/services/heyu-cli-service';

describe('heyu-cli-service', () => {
  let heyuCliService;
  let spawnWrapper;

  beforeEach(() => {
    spawnWrapper = jasmine.createSpyObj('spawnWrapper', ['spawn']);
    heyuCliService = new HeyuCliService({ spawnWrapper });
  });

  describe('turnOn', () => {
    it('spawns heyu with the "on" argument', async () => {
      await heyuCliService.turnOn('A', '2');
      expect(spawnWrapper.spawn).toHaveBeenCalledWith({
        args: ['on', 'A2'],
        keepStdout: false,
      });
    });
  });

  describe('turnOff', () => {
    it('spawns heyu with the "off" argument', async () => {
      await heyuCliService.turnOff('B', '15');
      expect(spawnWrapper.spawn).toHaveBeenCalledWith({
        args: ['off', 'B15'],
        keepStdout: false,
      });
    });
  });

  describe('getOnState', () => {
    it('spawns heyu with the "onstate" argument', async () => {
      spawnWrapper.spawn.and.returnValue({ output: '1' });
      await heyuCliService.getOnState('D', '10');
      expect(spawnWrapper.spawn).toHaveBeenCalledWith({
        args: ['onstate', 'D10'],
        keepStdout: true,
      });
    });

    it('returns "on" when the device is on', async () => {
      spawnWrapper.spawn.and.returnValue({ output: '1' });
      const state = await heyuCliService.getOnState('F', '14');
      expect(state).toBe('on');
    });

    it('returns "off" when the device is off', async () => {
      spawnWrapper.spawn.and.returnValue({ output: '0' });
      const state = await heyuCliService.getOnState('G', '6');
      expect(state).toBe('off');
    });
  });
});
