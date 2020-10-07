import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: 'provider_id'})
  provider: User;

  @Column('timestamp with time zone')
  date: Date;


}

export default Appointment;
