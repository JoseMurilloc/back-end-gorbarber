import AppError from '@shared/infra/http/errors/AppError';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';

import path from 'path';
import { inject, injectable } from 'tsyringe';
import IUserTokensRepositories from '../infra/typeorm/repositories/IUserTokensRepositories';

interface IRequest {
  email: string;
}


@injectable()
class SendForgotPasswordEmailServices {

  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepositories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepositories
  ) {}


  public async execute({ email }: IRequest) : Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exists');
    }

    const {token} = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[💈GOBARBER💈] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        }
      }
    });
  }
}

export default SendForgotPasswordEmailServices;
