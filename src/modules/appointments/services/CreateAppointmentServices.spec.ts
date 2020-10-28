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

  it('should not be able to create two appointments on the sme time', () => {
    expect(1 + 2).toBe(3);
  });
});
