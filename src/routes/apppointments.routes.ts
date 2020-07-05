import { Router, request } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentServices';

const appoitmentsRoutes = Router();
const appointmentsRepository =  new AppointmentsRepository();
const createAppointmentServices = new CreateAppointmentServices(appointmentsRepository);

appoitmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appoitmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const appointment = createAppointmentServices.execute({
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

export default appoitmentsRoutes;
