import { container } from 'tsyringe';
import { Response, Request } from 'express';
import UpdateProfileServices from '@modules/users/services/UpdateProfileServices';

class ProfileController {
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
