import { PartialType } from '@nestjs/swagger';
import { CreateTaxplayerDto } from './create-taxplayer.dto';

export class UpdateTaxplayerDto extends PartialType(CreateTaxplayerDto) {}
