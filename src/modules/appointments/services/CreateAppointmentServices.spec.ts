import AppError from '@shared/infra/http/errors/AppError';
import 'reflect-metadata';

import CreateAppointmentServices from './CreateAppointmentServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository
    );

    const appointment = await createAppointmentServices.execute({
      date: new Date(),
      provider_id: '125454966'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('125454966');
  });

  it('should not be able to create two appointments on the sme time', async() => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmentServices = new CreateAppointmentServices(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentServices.execute({
      date: appointmentDate,
      provider_id: '125454966'
    });

    expect(createAppointmentServices.execute({
      date: appointmentDate,
      provider_id: '125454966'
    })).rejects.toBeInstanceOf(AppError)

  });
});
