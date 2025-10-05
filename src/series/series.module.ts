import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { series } from './entities/series.entity';

@Module({
  imports: [TypeOrmModule.forFeature([series])],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
