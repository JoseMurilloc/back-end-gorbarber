import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ResetPasswordServices from '@modules/users/services/ResetPasswordServices';

class ResetPasswordController {
  public async create(request: Request, response: Response) : Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordServices);

    await resetPassword.execute({
      token,
      password
    });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
