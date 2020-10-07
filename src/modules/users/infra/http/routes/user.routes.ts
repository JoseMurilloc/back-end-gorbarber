import { Router } from 'express';
import multer from 'multer'

import CreateUserServices from '@modules/users/services/CreateUserServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';


const upload = multer(uploadConfig)
const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {

  const { name, email, password } = request.body;
  const createUserServices =  new CreateUserServices()

  const user = await createUserServices.execute({
    name,
    email,
    password
  })


  // delete user.password

  return response.json(user);
});

usersRoutes.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    // delete user.password

    return response.json(user);
})

export default usersRoutes;
