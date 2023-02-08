import { Address } from 'src/address/entities/address.entity';
import { Column, CreateDateColumn } from 'typeorm';
import { Taxplayer } from './../../taxplayer/entities/taxplayer.entity';
export class LegalRepresentative {
  id: string;
  name: string;
  lastName: string;
  legalRepresentativeRFC: string;
  address: Address;
  taxplayer: Taxplayer;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createAt: Date;
}
