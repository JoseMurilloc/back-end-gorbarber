import { uuid } from 'uuidv4';
import UserToken from '../../entities/UserToken';
import IUserTokensRepositories from '../IUserTokensRepositories';

class FakeUserTokensRepository implements IUserTokensRepositories {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string) : Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id
    });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
