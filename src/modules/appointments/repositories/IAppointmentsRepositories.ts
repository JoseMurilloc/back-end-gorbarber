import Appointment from "../infra/typeorm/entities/Appointment";

export default interface IAppointmentsRepositories {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
