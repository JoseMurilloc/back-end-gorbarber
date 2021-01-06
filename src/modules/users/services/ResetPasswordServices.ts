import AppError from '@shared/infra/http/errors/AppError';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';

import { inject, injectable } from 'tsyringe';
import IUserTokensRepositories from '../infra/typeorm/repositories/IUserTokensRepositories';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { addHours, isAfter } from 'date-fns';

// import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

interface IRequest {
  password: string;
  token: string;
}


@injectable()
class ResetPasswordServices {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}


  public async execute({ password, token }: IRequest) : Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user){
      throw new AppError('User not exists')
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);
    user.password = password
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordServices;
