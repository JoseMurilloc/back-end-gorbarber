import 'reflect-metadata';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';


describe('UpdateUserAvatar', () => {
  it('should be able to authentication', async () => {
    const fakeUsersRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );


    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@gmail.com',
      password: '123456'
    })


    await updateUserAvatar.execute({
      user_id: String(user.id),
      avatarFilename: 'avatar.png'
    })

    expect(user).toBe('avatar.png');

  });

});
