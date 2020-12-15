import AppError from '@shared/infra/http/errors/AppError';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';

// cSpell:disable
import { inject, injectable } from 'tsyringe';
import IUserTokensRepositories from '../infra/typeorm/repositories/IUserTokensRepositories';

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
    private userTokensRepository: IUserTokensRepositories
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

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordServices;
