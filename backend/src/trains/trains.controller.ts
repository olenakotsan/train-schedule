import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TrainsService } from './trains.service';
import { CreateTrainDto, UpdateTrainDto } from '../dto/train.dto';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  async create(@Body(ValidationPipe) createTrainDto: CreateTrainDto) {
    try {
      return await this.trainsService.create(createTrainDto);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : 'Failed to create train',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
    @Query('sortBy') sortBy: string = 'departureTime',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    return await this.trainsService.findAll(
      parseInt(page),
      parseInt(limit),
      search,
      sortBy,
      sortOrder,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const train = await this.trainsService.findOne(+id);
    if (!train) {
      throw new HttpException('Train not found', HttpStatus.NOT_FOUND);
    }
    return train;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) createTrainDto: CreateTrainDto,
  ) {
    return await this.trainsService.update(+id, createTrainDto);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTrainDto: UpdateTrainDto,
  ) {
    return await this.trainsService.partialUpdate(+id, updateTrainDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.trainsService.delete(+id);
    return { message: 'Train deleted successfully' };
  }
}
