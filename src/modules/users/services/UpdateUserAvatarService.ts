import User from '../infra/typeorm/entities/User';
import AppError from '@shared/infra/http/errors/AppError';
import IUsersRepositories from '../repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {

  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}


  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated suers can change avatar')
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename;
    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService;
