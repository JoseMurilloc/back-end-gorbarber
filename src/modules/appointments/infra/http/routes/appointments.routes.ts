import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

const appointmentsRoutes = Router();


appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async(request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const appointmentsRepository = new AppointmentsRepository();


  const createAppointmentServices = new CreateAppointmentServices(appointmentsRepository);

  const appointment = await createAppointmentServices.execute({
    provider_id,
    date: parsedDate
  });

  response.json(appointment);

});

export default appointmentsRoutes;
