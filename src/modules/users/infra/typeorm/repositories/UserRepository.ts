import User from '@modules/users/infra/typeorm/entities/User';
import { Repository, getRepository } from 'typeorm';
import IUsersRepositories from "@modules/users/repositories/IUsersRepositories";
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserRepository implements IUsersRepositories {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
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
