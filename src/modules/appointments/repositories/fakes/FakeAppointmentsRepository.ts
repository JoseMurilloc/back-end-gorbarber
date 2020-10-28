import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories';
import { uuid } from 'uuidv4';

import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepositories {

  private appointments: Appointment[] = [];


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      appointment.date === date);

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
