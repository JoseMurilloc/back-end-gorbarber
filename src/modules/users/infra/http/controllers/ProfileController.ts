import { container } from 'tsyringe';
import { Response, Request } from 'express';
import UpdateProfileServices from '@modules/users/services/UpdateProfileServices';
import ShowProfileServices from '@modules/users/services/ShowProfileServices';

class ProfileController {

  public async show (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileServices);

    const user = await showProfile.execute({ user_id });

    delete user.password

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileServices);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });

    delete user.password;

    return response.json(user);

  }
}

export default ProfileController;
