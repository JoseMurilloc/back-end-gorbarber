import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/infra/http/errors/AppError';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
}

@injectable()
export default class ShowProfileServices {

  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories,
  ) {}

  public async execute({ user_id }: IRequest) : Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    return user;
  }
}

