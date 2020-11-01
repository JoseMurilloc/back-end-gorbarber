import AppError from '@shared/infra/http/errors/AppError';
import 'reflect-metadata';
import CreateUserServices from '@modules/users/services/CreateUserServices';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const createUser = new CreateUserServices(
      fakeUsersRepository
    );

    const user = await createUser.execute({
      name: 'Jonh Doe',
      email: 'john@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });
});

it('should not be able to create a new user with same email from another', async () => {
  const fakeUsersRepository = new FakeUserRepository();

  const createUser = new CreateUserServices(
    fakeUsersRepository
  );

  const user = await createUser.execute({
    name: 'Jonh Doe',
    email: 'john@gmail.com',
    password: '123456'
  });

  expect(createUser.execute({
    name: 'Jonh Doe',
    email: 'john@gmail.com',
    password: '123456'
  })).rejects.toBeInstanceOf(AppError)
});
