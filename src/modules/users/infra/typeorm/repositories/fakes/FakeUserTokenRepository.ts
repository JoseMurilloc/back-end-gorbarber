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
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string) : Promise<UserToken | undefined> {
    return this.userTokens.find(findToken => findToken.token === token)
  }

}

export default FakeUserTokensRepository;
