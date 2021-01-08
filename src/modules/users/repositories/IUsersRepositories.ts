import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllProviderDTO from "../dtos/IFindAllProviderDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepositories {
  findById(id: string) : Promise<User | undefined>;
  findByEmail(email: string) : Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
  findAllProvide(except_user_id?: IFindAllProviderDTO): Promise<User[]>
}
