import log from '../util/logger';
import { isValidHouseCode, isValidUnitCode } from '../util/x10-utils';

export default class HeyuCliService {
  constructor({ spawnWrapper }) {
    this.spawnWrapper = spawnWrapper;
  }

  runHeyuCommand({ args, keepStdout }) {
    return this.spawnWrapper.spawn({ args, keepStdout });
  }

  heyuDeviceCommand({
    command,
    houseCode,
    unitCode,
    keepStdout = false,
  }) {
    if (!isValidHouseCode(houseCode) || !isValidUnitCode(unitCode)) {
      log.error(`Invalid house/unit code: ${houseCode}${unitCode}`);
      throw new Error('Invalid house code or unit code.');
    }

    const args = [command, String(houseCode) + String(unitCode)];
    return this.runHeyuCommand({ args, keepStdout });
  }

  async turnOn(houseCode, unitCode) {
    try {
      await this.heyuDeviceCommand({ command: 'on', houseCode, unitCode });
    } catch (e) {
      log.error(`"heyu on" failed: ${e.message}`);
      throw new Error('Failed to change device state.');
    }
  }

  async turnOff(houseCode, unitCode) {
    try {
      await this.heyuDeviceCommand({ command: 'off', houseCode, unitCode });
    } catch (e) {
      log.error(`"heyu off" failed: ${e.message}`);
      throw new Error('Failed to change device state.');
    }
  }

  async getOnState(houseCode, unitCode) {
    try {
      const result = await this.heyuDeviceCommand({
        command: 'onstate',
        houseCode,
        unitCode,
        keepStdout: true,
      });

      const onstate = result.output.trim();
      if (onstate === '1') return 'on';
      if (onstate === '0') return 'off';
      return 'unknown';
    } catch (e) {
      log.error(`"heyu onstate" failed: ${e.message}`);
      throw new Error('Failed to retrieve device state.');
    }
  }
}
