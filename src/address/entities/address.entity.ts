import { Country } from './../../country/entities/country.entity';
import { State } from 'src/state/entities/state.entity';
import { City } from 'src/cities/entities/city.entity';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 128,
  })
  street: string;

  @Column({
    name: 'int_number',
    type: 'character varying',
    length: 32,
  })
  intNumber: string;

  @Column({
    name: 'ext_number',
    type: 'character varying',
    length: 32,
  })
  extNumber: string;

  @Column({
    name: 'zip_code',
    type: 'character varying',
    length: 32,
  })
  zipCode: string;

  @Column({
    type: 'character varying',
    length: 64,
  })
  suburb: string;

  @OneToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @OneToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @OneToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createAt: Date;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;
}
