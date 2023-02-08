import { Controller, Get, Param, Delete } from '@nestjs/common';
import { StateService } from '../service/state.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('States')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.remove(+id);
  }
}
