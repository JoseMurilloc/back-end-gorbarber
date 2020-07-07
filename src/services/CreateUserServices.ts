import User from '../models/User';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkExist = await usersRepository.findOne({
      where: {
        email
      }
    })

    if (checkExist) {
      throw new Error('Email address already  used')
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserServices;