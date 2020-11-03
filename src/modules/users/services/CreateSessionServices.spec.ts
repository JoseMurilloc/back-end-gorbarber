import 'reflect-metadata';
import AppError from '@shared/infra/http/errors/AppError';
import CreateUserServices from '@modules/users/services/CreateUserServices';
import CreateSessionServices from '@modules/users/services/CreateSessionServices';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('AuthenticationUser', () => {
  it('should be able to authentication', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticationUser = new CreateSessionServices(
      fakeUsersRepository,
      fakeHashProvider
    );


    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    const response = await authenticationUser.execute({
      email: 'john@gmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });


  it('should be able to authentication with non existing user', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticationUser = new CreateSessionServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticationUser.execute({
        email: 'john@gmail.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticated is wrong password', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticationUser = new CreateSessionServices(
      fakeUsersRepository,
      fakeHashProvider
    );


    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })


    expect(
      authenticationUser.execute({
        email: 'john@gmail.com',
        password: 'wrong-123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
