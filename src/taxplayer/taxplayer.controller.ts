import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxplayerService } from './taxplayer.service';
import { CreateTaxplayerDto } from './dto/create-taxplayer.dto';
import { UpdateTaxplayerDto } from './dto/update-taxplayer.dto';

@Controller('taxplayer')
export class TaxplayerController {
  constructor(private readonly taxplayerService: TaxplayerService) {}

  @Post()
  create(@Body() createTaxplayerDto: CreateTaxplayerDto) {
    return this.taxplayerService.create(createTaxplayerDto);
  }

  @Get()
  findAll() {
    return this.taxplayerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxplayerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxplayerDto: UpdateTaxplayerDto) {
    return this.taxplayerService.update(+id, updateTaxplayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxplayerService.remove(+id);
  }
}
