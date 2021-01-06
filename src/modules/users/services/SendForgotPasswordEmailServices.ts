  import AppError from '@shared/infra/http/errors/AppError';
  import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
  import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';

  // cSpell:disable
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

      await this.mailProvider.sendMail(
        email,
        `Pedido de recuperação de senha recebido: ${token}`
      );
    }
  }

  export default SendForgotPasswordEmailServices;
