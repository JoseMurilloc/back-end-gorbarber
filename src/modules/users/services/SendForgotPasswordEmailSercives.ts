import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  email: string;
}


@injectable()
class SendForgotPasswordEmailSercives {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}


  public async execute({ email }: IRequest) : Promise<void> {
    await this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
  }
}

export default SendForgotPasswordEmailSercives;
