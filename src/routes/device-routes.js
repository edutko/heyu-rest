import log from '../util/logger';

export default class DeviceRoutes {
  constructor({ heyuCliService }) {
    this.heyu = heyuCliService;
  }

  async getState(req, res) {
    try {
      const { houseCode, unitCode } = req.params;

      const state = await this.heyu.getOnState(houseCode, unitCode);
      DeviceRoutes.sendState(res, houseCode, unitCode, state);
    } catch (e) {
      log.error(`${e.message}\n${e.stack}`);
      res.status(500)
        .json({ status: 500, message: e.message });
    }
  }

  async setState(req, res) {
    const { houseCode, unitCode } = req.params;
    const { state } = req.body;

    try {
      if (state.match(/^on$/i)) {
        await this.heyu.turnOn(houseCode, unitCode);
        DeviceRoutes.sendState(res, houseCode, unitCode, state);
      } else if (state.match(/^off$/i)) {
        await this.heyu.turnOff(houseCode, unitCode);
        DeviceRoutes.sendState(res, houseCode, unitCode, state);
      } else {
        res.status(400)
          .json({ status: 400, message: 'Invalid state. Expected "on" or "off".' });
      }
    } catch (e) {
      log.error(`${e.message}\n${e.stack}`);
      res.status(500)
        .json({ status: 500, message: `Failed to set state of unit ${houseCode}${unitCode}.` });
    }
  }

  static sendState(res, houseCode, unitCode, state) {
    res.status(200)
      .json({ houseCode, unitCode, state });
  }
}
