import { Company } from 'src/company/entities/company.entity';
import { LegalRepresentative } from 'src/legal-representative/entities/legal-representative.entity';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Taxplayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'business_name',
    type: 'character varying',
    length: 128,
    nullable: false,
  })
  businessName: string;

  @Column({
    name: 'taxpayer_RFC',
    type: 'character varying',
    length: 64,
    nullable: false,
    unique: true,
  })
  taxpayerRFC: string;

  legalRepresentative: LegalRepresentative; //@OneToOne(mappedBy = "contribuyente", cascade = CascadeType.ALL)

  company: Company; //@OneToOne  @JoinColumn(name = "public_key_compania")

  @Column({
    type: 'character varying',
    length: 128,
    nullable: false,
  })
  iv: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createAt: Date;
}
