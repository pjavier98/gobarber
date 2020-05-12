import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersControllers from '../controllers/UsersController';
import UserAvatarControllers from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersControllers = new UsersControllers();
const userAvatarControllers = new UserAvatarControllers();

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControllers.update,
);

export default usersRouter;
