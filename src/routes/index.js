import { heyuCliService } from '../services/services';
import DeviceRoutes from './device-routes';

const deviceRoutes = new DeviceRoutes({ heyuCliService });

const routes = (app) => {
  app.route('/houses/:houseCode/units/:unitCode/state')
    .post((req, res, next) => deviceRoutes.setState(req, res, next))
    .get((req, res, next) => deviceRoutes.getState(req, res, next));
};

export default routes;
