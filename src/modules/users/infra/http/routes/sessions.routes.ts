import { Router } from 'express';
import CreateSessionServices from '@modules/users/services/CreateSessionServices';
import UserRepository from '../../typeorm/repositories/UserRepository';

const sessionsRoutes = Router();


sessionsRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;
  const userRepository = new UserRepository();

  const createSessionServices = new CreateSessionServices(userRepository);

  const { user, token } = await createSessionServices.execute({
    email,
    password
  })

  // delete user.password

  return response.json({ user, token });

});

export default sessionsRoutes;
