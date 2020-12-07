import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository'
import SendForgotPasswordEmailSercives from './SendForgotPasswordEmailSercives'

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');


    const sendForgotPassword = new SendForgotPasswordEmailSercives(
      fakeUserRepository,
      fakeMailProvider
    );

    await fakeUserRepository.create({
      email: 'jonh@mail.com',
      name: 'John',
      password: '123456'
    });

    await sendForgotPassword.execute({
      email: 'john@mail.com'
    });

    expect(sendMail).toHaveBeenCalled();

  })
})
