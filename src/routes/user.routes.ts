import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserServices from '../services/CreateUserServices';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {

    const { name, email, password } = request.body;
    const createUserServices =  new CreateUserServices()

    const user = await createUserServices.execute({
      name,
      email,
      password
    })


    delete user.password

    return response.json(user);
  } catch(err) {
    return response.status(400).json({
      error: err.message
    })
  }
});

export default usersRoutes;
