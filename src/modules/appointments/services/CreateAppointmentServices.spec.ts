import AppError from '@shared/infra/http/errors/AppError';
import 'reflect-metadata';

import CreateAppointmentServices from './CreateAppointmentServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentServices;


describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentServices(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {

    const appointment = await createAppointment.execute({
      user_id: '121212',
      date: new Date(),
      provider_id: '125454966'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('125454966');
  });

  it('should not be able to create two appointments on the sme time', async() => {

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      user_id: '121212',
      date: appointmentDate,
      provider_id: '125454966'
    });

    expect(createAppointment.execute({
      user_id: '121212',
      date: appointmentDate,
      provider_id: '125454966'
    })).rejects.toBeInstanceOf(AppError)

  });
});
