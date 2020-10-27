import { container } from 'tsyringe';
import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';
import AppointmentController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();

const appointmentController = new AppointmentController();
appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async(request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRoutes.post('/', appointmentController.create);

export default appointmentsRoutes;
