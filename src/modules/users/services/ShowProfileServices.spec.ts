import 'reflect-metadata';

import AppError from '@shared/infra/http/errors/AppError';
import ShowProfileServices from '@modules/users/services/ShowProfileServices';
import FakeUserRepository from "../infra/typeorm/repositories/fakes/FakeUserRepository";

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileServices;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfile = new ShowProfileServices(
      fakeUserRepository
    );

  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile from a non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
})
