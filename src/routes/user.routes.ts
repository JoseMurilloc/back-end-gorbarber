import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserServices from '../services/CreateUserServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer'
import uploadConfig from '../config/upload'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';


const upload = multer(uploadConfig)
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

usersRoutes.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
  try {

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    delete user.password

    return response.json(user);
  } catch(err) {
    return response.status(400).json({
      error: err.message
    })
  }
})

export default usersRoutes;
