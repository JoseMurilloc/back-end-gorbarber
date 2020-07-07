import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';

interface Request {
  provider_id: string,
  date: Date
}


/**
 * Dependency Inversion
 */

class CreateAppointmentServices {



  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository
      .findByDate(appointmentDate);

    if (findAppointmentInSameDate)
      throw Error('Is Appointment is already booked');

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;

  }
}

export default CreateAppointmentServices;
