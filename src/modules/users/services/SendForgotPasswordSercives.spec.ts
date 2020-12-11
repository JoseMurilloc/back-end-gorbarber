import AppError from '@shared/infra/http/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository'
import SendForgotPasswordEmailServices from './SendForgotPasswordEmailServices'
import FakeUserTokensRepository from '../infra/typeorm/repositories/fakes/FakeUserTokenRepository';


let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailServices;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailServices(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );

  });

  it('should be able to recover the password using the email', async () => {


    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to recover a non-existing user password', async() => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'john@mail.com'
      })
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John',
      email: 'jooseemurillo@gmail.com',
      password: '123456'
    })

    await sendForgotPasswordEmail.execute({
      email: 'jooseemurillo@gmail.com'
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  })
})
