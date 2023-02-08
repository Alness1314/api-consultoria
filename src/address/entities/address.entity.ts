import { Country } from './../../country/entities/country.entity';
import { State } from 'src/state/entities/state.entity';
import { City } from 'src/cities/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('Address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 128,
    nullable: true,
  })
  street: string;

  @Column({
    name: 'int_number',
    type: 'character varying',
    length: 32,
    nullable: true,
  })
  intNumber: string;

  @Column({
    name: 'ext_number',
    type: 'character varying',
    length: 32,
    nullable: true,
  })
  extNumber: string;

  @Column({
    name: 'zip_code',
    type: 'character varying',
    length: 32,
    nullable: true,
  })
  zipCode: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: true,
  })
  suburb: string;

  @ManyToOne(() => City, { eager: true })
  @JoinColumn()
  city: City;

  @ManyToOne(() => State, { eager: true })
  @JoinColumn()
  state: State;

  @ManyToOne(() => Country, { eager: true })
  @JoinColumn()
  country: Country;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createAt: Date;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;
}
