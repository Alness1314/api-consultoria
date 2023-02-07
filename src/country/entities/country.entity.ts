import { State } from 'src/state/entities/state.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'country_code',
    type: 'character varying',
    length: 3,
    nullable: false,
  })
  countryCode: string;

  @OneToMany(() => State, (state) => state.country, {
    cascade: true,
    lazy: true,
  })
  states: State[];
}
