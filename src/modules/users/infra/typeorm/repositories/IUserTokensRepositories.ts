import UserToken from '../entities/UserToken';

export default interface IUserTokensRepositories {
  generate(user_id: string): Promise<UserToken>
  findByToken(token: string): Promise<UserToken | undefined>
}
