import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories';
import Appointment from '../infra/typeorm/entities/Appointment';

import { startOfHour, parseISO } from 'date-fns';

import AppError from '@shared/infra/http/errors/AppError';

interface IRequest {
  provider_id: string,
  date: Date
}


/**
 * Dependency Inversion
 */

class CreateAppointmentServices {

  constructor(private appointmentsRepository: IAppointmentsRepositories) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository
      .findByDate(appointmentDate);

    if (findAppointmentInSameDate)
      throw new AppError('Is Appointment is already booked', 401);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });


    return appointment;

  }
}

export default CreateAppointmentServices;
