import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories';
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepositories {

  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.findOne({
      where: { date }
    })

    return findAppointment;

  }
}

export default AppointmentsRepository;
