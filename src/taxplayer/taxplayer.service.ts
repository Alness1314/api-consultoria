import { Injectable } from '@nestjs/common';
import { CreateTaxplayerDto } from './dto/create-taxplayer.dto';
import { UpdateTaxplayerDto } from './dto/update-taxplayer.dto';

@Injectable()
export class TaxplayerService {
  create(createTaxplayerDto: CreateTaxplayerDto) {
    return 'This action adds a new taxplayer';
  }

  findAll() {
    return `This action returns all taxplayer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxplayer`;
  }

  update(id: number, updateTaxplayerDto: UpdateTaxplayerDto) {
    return `This action updates a #${id} taxplayer`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxplayer`;
  }
}
