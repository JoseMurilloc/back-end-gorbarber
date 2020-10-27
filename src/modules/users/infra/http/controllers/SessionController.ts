import CreateSessionServices from '@modules/users/services/CreateSessionServices';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionServices = container.resolve(CreateSessionServices);

    const { user, token } = await createSessionServices.execute({
      email,
      password
    })

    delete user.password

    return response.json({ user, token });
  }
}

export default SessionController;
