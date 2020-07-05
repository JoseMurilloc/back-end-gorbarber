import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string,
  date: Date
}


/**
 * Dependency Inversion
 */

class CreateAppointmentServices {

  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }


  public execute({ provider, date }: Request): Appointment {

    const findAppoitmentInSameDate = this.appointmentsRepository
      .findByDate(date);

    if (findAppoitmentInSameDate)
      throw Error('Is appoitment is already booked');

    const appointment = this.appointmentsRepository.create({
      provider,
      date,
    });

    return appointment;

  }
}

export default CreateAppointmentServices;
