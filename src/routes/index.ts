import { Router } from 'express';
import AppointmentsRoutes from './apppointments.routes';

const routes = Router();

routes.use('/appointments',AppointmentsRoutes)

export default routes;
