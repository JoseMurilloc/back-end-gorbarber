import 'reflect-metadata';

import CreateSession from '@modules/users/services/CreateSessionServices';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import CreateUserServices from './CreateUserServices';

describe('SessionUser', () => {
  it('should be able to authentication', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const createUser = new CreateUserServices(
      fakeUsersRepository
    )

    const authenticationUser = new CreateSession(
      fakeUsersRepository
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
});
