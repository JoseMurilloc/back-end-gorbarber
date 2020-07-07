import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateSessionServices from '../services/CreateSessionServices';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {

    const { email, password } = request.body;
    const createSessionServices = new CreateSessionServices();

    const { user, token } = await createSessionServices.execute({
      email,
      password
    })

    delete user.password

    return response.json({ user, token });
  } catch(err) {
    return response.status(400).json({
      error: err.message
    })
  }
});

export default sessionsRoutes;
