import 'reflect-metadata';
import AppError from '@shared/infra/http/errors/AppError';
import CreateUserServices from '@modules/users/services/CreateUserServices';
import CreateSessionServices from '@modules/users/services/CreateSessionServices';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: CreateSessionServices;
let createUser: CreateUserServices;

describe('AuthenticationUser', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new CreateSessionServices(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );
  });



  it('should be able to authentication', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'john@gmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });


  it('should be able to authentication with non existing user', async () => {
    expect(
      authenticateUser.execute({
        email: 'john@gmail.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authenticated is wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456'
    })


    expect(
      authenticateUser.execute({
        email: 'john@gmail.com',
        password: 'wrong-123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
