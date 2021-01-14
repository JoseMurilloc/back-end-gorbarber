import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
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
    const appoitments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month
    });

    console.log(appoitments);



    return [{ day: 1, available: false }]
  }
}

export default ListProviderMonthAvailabilityServices;
