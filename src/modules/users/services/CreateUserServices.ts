import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';


import IHashProvider from '../providers/HashProvider/models/IHashProvider';
interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserServices {

  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkExist = await this.usersRepository.findByEmail(email)

    if (checkExist) {
      throw new AppError('Email address already  used', 401);
    }

    const passwordHash = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    })


    return user
  }
}

export default CreateUserServices;
