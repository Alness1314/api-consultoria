import { Address } from './../../address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'company_name',
    type: 'character varying',
    length: 128,
    nullable: false,
  })
  companyName: string;

  @Column({
    type: 'character varying',
    length: 512,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'character varying',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'character varying',
    length: 15,
    nullable: false,
  })
  phone: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column({
    type: 'character varying',
    length: 255,
    nullable: true,
  })
  image: string; //id de la imagen

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createAt: Date;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;
  //taxpayer: Taxpayer; //relacion uno a uno //@OneToOne(mappedBy = "compania", cascade = CascadeType.ALL)
  //employees: Employees[]; //@OneToMany(mappedBy = "compania", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
}
