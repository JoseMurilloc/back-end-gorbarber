import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers'

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepositories';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import IUserTokensRepositories from '@modules/users/infra/typeorm/repositories/IUserTokensRepositories';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';


container.registerSingleton<IAppointmentsRepositories>(
  'AppointmentsRepository',
  AppointmentsRepository
);

container.registerSingleton<IUsersRepositories>(
  'UserRepository',
  UserRepository
);

container.registerSingleton<IUserTokensRepositories>(
  'UserTokensRepository',
  UserTokensRepository
);
