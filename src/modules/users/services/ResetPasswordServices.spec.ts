import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository'
import FakeUserTokensRepository from '../infra/typeorm/repositories/fakes/FakeUserTokenRepository';
import ResetPasswordServices from './ResetPasswordServices';


let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordServices: ResetPasswordServices;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordServices = new ResetPasswordServices(
      fakeUserRepository,
      fakeUserTokensRepository
    );

  });

  it('should be to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordServices.execute({
      password: '654321',
      token,
    })

    const updateUser = await fakeUserRepository.findById(user.id);

    expect(updateUser?.password).toBe('654321');
  });
})
