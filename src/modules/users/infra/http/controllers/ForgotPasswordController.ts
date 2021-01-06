import { container } from 'tsyringe';
import { Request, Response } from 'express';

import SendForgotPasswordEmailServices from '@modules/users/services/SendForgotPasswordEmailServices'

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendMailProvividerService = container.resolve(SendForgotPasswordEmailServices)

    await sendMailProvividerService.execute({
      email
    })

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
