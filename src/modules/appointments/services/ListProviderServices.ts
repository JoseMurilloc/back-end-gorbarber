import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepositories from '@modules/users/repositories/IUsersRepositories';
import { inject, injectable } from "tsyringe";


interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProviderServices {
  constructor (
    @inject('UserRepository')
    private userRepository: IUsersRepositories
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProvide({
      except_user_id: user_id
    });

    return users;
  }
}
