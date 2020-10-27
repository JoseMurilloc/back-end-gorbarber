import { Router } from 'express';
import multer from 'multer'

import CreateUserServices from '@modules/users/services/CreateUserServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import uploadConfig from '@config/upload'

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig)
const usersRoutes = Router();

usersRoutes.post('/', usersController.create);

usersRoutes.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRoutes;
