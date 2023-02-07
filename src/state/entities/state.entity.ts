import { City } from 'src/cities/entities/city.entity';
import { Country } from 'src/country/entities/country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  name: string;

  @OneToMany(() => City, (city) => city.state, {
    cascade: true,
    lazy: true,
  })
  cities: City[];

  @ManyToOne(() => Country, (country) => country.states)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
