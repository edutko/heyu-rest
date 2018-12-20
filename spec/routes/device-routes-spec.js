import DeviceRoutes from '../../src/routes/device-routes';

describe('device-routes', () => {
  let deviceRoutes;
  let mockHeyuSvc;
  let res;
  let req;

  beforeEach(() => {
    mockHeyuSvc = jasmine.createSpyObj('heyuCliService', [
      'turnOn',
      'turnOff',
      'getOnState',
    ]);

    req = {
      query: {},
      params: {},
      body: {},
    };

    res = jasmine.createSpyObj('res', [
      'status',
      'json',
    ]);
    res.status.and.callFake(() => res);
    res.json.and.callFake(() => res);

    deviceRoutes = new DeviceRoutes({ heyuCliService: mockHeyuSvc });
  });

  describe('getState', () => {
    it('returns the state when the device is on', async () => {
      req.params.houseCode = 'A';
      req.params.unitCode = '1';
      mockHeyuSvc.getOnState.and.returnValue('on');

      await deviceRoutes.getState(req, res);
      expect(mockHeyuSvc.getOnState).toHaveBeenCalledWith('A', '1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ houseCode: 'A', unitCode: '1', state: 'on' });
    });

    it('returns the state when the device is off', async () => {
      req.params.houseCode = 'A';
      req.params.unitCode = '1';
      mockHeyuSvc.getOnState.and.returnValue('off');

      await deviceRoutes.getState(req, res);
      expect(mockHeyuSvc.getOnState).toHaveBeenCalledWith('A', '1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ houseCode: 'A', unitCode: '1', state: 'off' });
    });
  });

  describe('setState', () => {
    it('sets the state to ON when the body contains "state": "on"', async () => {
      req.params.houseCode = 'A';
      req.params.unitCode = '1';
      req.body.state = 'on';

      await deviceRoutes.setState(req, res);
      expect(mockHeyuSvc.turnOn).toHaveBeenCalledWith('A', '1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ houseCode: 'A', unitCode: '1', state: 'on' });
    });

    it('sets the state to OFF when the body contains "state": "off"', async () => {
      req.params.houseCode = 'A';
      req.params.unitCode = '1';
      req.body.state = 'off';

      await deviceRoutes.setState(req, res);
      expect(mockHeyuSvc.turnOff).toHaveBeenCalledWith('A', '1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ houseCode: 'A', unitCode: '1', state: 'off' });
    });
  });
});
