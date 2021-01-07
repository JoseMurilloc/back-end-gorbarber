import 'reflect-metadata';

import CreateSession from '@modules/users/services/CreateSessionServices';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import CreateUserServices from './CreateUserServices';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/infra/http/errors/AppError';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserServices;

describe('SessionUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserServices(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authentication', async () => {
    const authenticationUser = new CreateSession(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'John doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    const response = await authenticationUser.execute({
      email: 'john@gmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
