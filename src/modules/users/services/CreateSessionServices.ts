import { sign } from 'jsonwebtoken';

import User from '../infra/typeorm/entities/User';

import authConfig from '@config/auth';
import AppError from '@shared/infra/http/errors/AppError';
import IUsersRepositories from '../repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateSessionServices {

  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories,


    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password is invalid combination', 401)
    }

    const passwordMath = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMath) {
      throw new AppError('Email or password is invalid combination', 401)
    }

    const { id } = user;

    const token = sign({}, authConfig.secret, {
      subject: String(id),
      expiresIn: authConfig.expiresIn
    })

    return {
      user,
      token
    }

  }
}

export default CreateSessionServices;
