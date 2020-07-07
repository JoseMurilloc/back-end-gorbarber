import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import authConfig from '../config/auth';
import { sign } from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

class CreateSessionServices {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error('Email or password is invalid combination')
    }

    const passwordMath = compare(password, user.password)

    if (!passwordMath) {
      throw new Error('Email or password is invalid combination')
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
