import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';

import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', async(request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const createAppointmentServices = new CreateAppointmentServices();

  const appointment = await createAppointmentServices.execute({
    provider_id,
    date: parsedDate
  });

  response.json(appointment);

});

export default appointmentsRoutes;
