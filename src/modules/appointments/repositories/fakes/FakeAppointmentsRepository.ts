import { getMonth, getYear, isEqual } from 'date-fns';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories';
import { uuid } from 'uuidv4';

import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepositories {

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appoitment => {
      const appointments = this.appointments.filter(
        appointment =>
          appointment.provider_id === provider_id &&
          getMonth(appointment.date) + 1 === month &&
          getYear(appointment.date) === year,
      );

      return appointments;
    }
    )

    return appointments
  }

  private appointments: Appointment[] = [];


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date));

    return findAppointment;
  }

  public async create({
    provider_id, date
  }: ICreateAppointmentDTO) : Promise<Appointment> {
    const appointment = new Appointment();

    appointment.date = date;
    appointment.provider_id = provider_id;
    appointment.id = uuid();

    this.appointments.push(appointment);

    return appointment;

  }
}

export default FakeAppointmentsRepository;
