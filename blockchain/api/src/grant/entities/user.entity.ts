import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Grant } from './grant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;
}