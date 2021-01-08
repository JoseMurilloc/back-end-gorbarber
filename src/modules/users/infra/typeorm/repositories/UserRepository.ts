import User from '@modules/users/infra/typeorm/entities/User';
import { Repository, getRepository, Not } from 'typeorm';
import IUsersRepositories from "@modules/users/repositories/IUsersRepositories";
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProviderDTO';

class UserRepository implements IUsersRepositories {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findAllProvide({ except_user_id }: IFindAllProviderDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id)
        }
      })
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });

    return user;
  }

  public async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({
      email,
      name,
      password
    });

    await this.ormRepository.save(appointment);

    return appointment;

  }

  public save(data: User): Promise<User> {
    return this.ormRepository.save(data);
  }


}

export default UserRepository;
