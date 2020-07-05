import { Router } from 'express';
import appoitmentsRoutes from './apppointments.routes';

const routes = Router();

routes.use('/appointments',appoitmentsRoutes)

export default routes;
