import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Train } from '../entities/train.entity';
import { CreateTrainDto, UpdateTrainDto } from '../dto/train.dto';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Train)
    private trainRepository: Repository<Train>,
  ) {}

  async create(createTrainDto: CreateTrainDto): Promise<Train> {
    const train = this.trainRepository.create(createTrainDto);
    return await this.trainRepository.save(train);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    sortBy: string = 'departureTime',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: Train[]; total: number; page: number; limit: number }> {
    const query = this.trainRepository.createQueryBuilder('train');

    if (search) {
      query.where(
        'train.trainNumber ILIKE :search OR train.departure ILIKE :search OR train.arrival ILIKE :search',
        { search: `%${search}%` },
      );
    }

    query.andWhere('train.isActive = :isActive', { isActive: true });

    query.orderBy(`train.${sortBy}`, sortOrder);

    const offset = (page - 1) * limit;
    query.skip(offset).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<Train> {
    return await this.trainRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTrainDto: UpdateTrainDto): Promise<Train> {
    await this.trainRepository.update(id, updateTrainDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.trainRepository.update(id, { isActive: false });
  }

  async hardDelete(id: number): Promise<void> {
    await this.trainRepository.delete(id);
  }
}
