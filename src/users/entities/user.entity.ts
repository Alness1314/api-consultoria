import { Profile } from './../../profiles/entities/profile.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'character varying',
    length: 128,
    nullable: false,
    select: false,
  })
  password: string;

  /*@OneToOne(() => Detail)
  @JoinColumn()
  detail: Detail;*/

  //@Column({ type: 'nvarchar', length: 255, nullable:true})
  //detail: string;

  @ManyToMany(() => Profile)
  @JoinTable({ name: 'user_profile' })
  profiles: Profile[];

  @Column({ type: 'boolean', default: true })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  checkEmail() {
    this.email = this.email.toLowerCase().trim();
  }
}
