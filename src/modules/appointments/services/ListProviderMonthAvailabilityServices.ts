import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import { getDate, getDaysInMonth } from 'date-fns';
import { inject, injectable } from "tsyringe";
import IAppointmentsRepositories from '../repositories/IAppointmentsRepositories';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityServices {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentsRepositories
  ) {}

  public async execute({month, year, provider_id}: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month
    });

    const numberOfDayIsMonth = getDaysInMonth(
      new Date(year, month - 1)
    );

    const eachDayArray = Array.from(
      { length: numberOfDayIsMonth },
      (_, index) => index+1
    )

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });



    return availability;
  }
}

export default ListProviderMonthAvailabilityServices;
