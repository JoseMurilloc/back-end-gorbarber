import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories';

import '@modules/users/providers';
import './providers'

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';


container.registerSingleton<IAppointmentsRepositories>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepositories>(
  'UserRepository',
  UserRepository
);
