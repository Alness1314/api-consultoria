import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { State } from '../entities/state.entity';
import { Repository } from 'typeorm';
import { ResponseStateDto } from '../dto/response-state.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly _stateRepository: Repository<State>,
  ) {}

  async findAll(): Promise<ResponseStateDto[]> {
    const listStates = await this._stateRepository.find();
    return plainToInstance(ResponseStateDto, listStates);
  }

  async findOne(id: string): Promise<ResponseStateDto> {
    const state = await this._stateRepository.findOne({ where: { id: id } });
    if (!state) {
      throw new NotFoundException('state not found');
    }
    return plainToInstance(ResponseStateDto, state);
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }
}
