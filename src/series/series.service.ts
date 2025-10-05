import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { series } from './entities/series.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(series)
    private seriesRepository: Repository<series>,
  ) {}

  findAll() {
    return this.seriesRepository.find();
  }
  create(createSeriesDto: CreateSeriesDto) {
    const series = this.seriesRepository.create(createSeriesDto);
    return this.seriesRepository.save(series);
  }
  findOne(id: number) {
    return `This action returns a #${id} series`;
  }

  update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return `This action updates a #${id} series`;
  }

  remove(id: number) {
    return `This action removes a #${id} series`;
  }
}
