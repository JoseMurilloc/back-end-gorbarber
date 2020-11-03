import 'reflect-metadata';

import CreateSession from '@modules/users/services/CreateSessionServices';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import CreateUserServices from './CreateUserServices';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('SessionUser', () => {
  it('should be able to authentication', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    )

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
});
