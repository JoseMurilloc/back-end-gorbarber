import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UserRepository from '../../typeorm/repositories/UserRepository';
import CreateUserServices from '@modules/users/services/CreateUserServices';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository();

    const { name, email, password } = request.body;
    const createUserServices = container.resolve(CreateUserServices);

    const user = await createUserServices.execute({
      name,
      email,
      password
    })

    delete user.password

    return response.json(user);
  }
}

export default UsersController;
