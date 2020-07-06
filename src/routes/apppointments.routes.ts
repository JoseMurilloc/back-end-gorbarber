import { Router, request } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentServices';
import { getCustomRepository } from 'typeorm';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async(request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const createAppointmentServices = new CreateAppointmentServices();

    const appointment = await createAppointmentServices.execute({
      provider,
      date: parsedDate
    });

    response.json(appointment);
  } catch(err) {
    return response.status(400).json({
      error: err.message
    })
  }
});

export default appointmentsRoutes;
