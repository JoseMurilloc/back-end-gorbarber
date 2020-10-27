import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserServices {

  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {

    const checkExist = await this.usersRepository.findByEmail(email)

    if (checkExist) {
      throw new AppError('Email address already  used', 401);
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash
    })


    return user
  }
}

export default CreateUserServices;
