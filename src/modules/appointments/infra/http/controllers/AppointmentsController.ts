import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';
import { parseISO, startOfHour } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const parsedDate = startOfHour(parseISO(date));


    const createAppointmentServices = container.resolve(CreateAppointmentServices);

    const appointment = await createAppointmentServices.execute({
      provider_id,
      date: parsedDate,
      user_id
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
