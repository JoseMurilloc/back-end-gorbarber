import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories';
import Appointment from '../infra/typeorm/entities/Appointment';
import { injectable, inject} from 'tsyringe';

import { startOfHour, parseISO } from 'date-fns';

import AppError from '@shared/infra/http/errors/AppError';

interface IRequest {
  provider_id: string,
  date: Date;
  user_id: string;
}


/**
 * Dependency Inversion
 */

@injectable()
class CreateAppointmentServices {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositories
  ) {}

  public async execute({ provider_id, date, user_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository
      .findByDate(appointmentDate);

    if (findAppointmentInSameDate)
      throw new AppError('Is Appointment is already booked', 401);

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    });


    return appointment;

  }
}

export default CreateAppointmentServices;
