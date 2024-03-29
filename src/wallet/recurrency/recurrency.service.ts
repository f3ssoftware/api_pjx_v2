import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Recurrency } from './recurrency.entity';

@Injectable()
export class RecurrencyService {
    constructor(
        @InjectRepository(Recurrency)
        private readonly recurrencyRepository: Repository<Recurrency>,
    ) {}

    async create(recurrencyData: Partial<Recurrency>): Promise<Recurrency> {
        const recurrency = this.recurrencyRepository.create(recurrencyData);
        return await this.recurrencyRepository.save(recurrency);
    }

    async findAll(): Promise<Recurrency[]> {
        return await this.recurrencyRepository.find();
    }

    async findOne(id: string): Promise<Recurrency> {
        const recurrencyId: FindOneOptions<Recurrency> = { where: {id}}
        const recurrency = await this.recurrencyRepository.findOne(recurrencyId);
        if (!recurrency) {
            throw new NotFoundException('Recurrency not found');
        }
        return recurrency;
    }

    async update(id: string, recurrencyData: Partial<Recurrency>): Promise<Recurrency> {
        const recurrency = await this.findOne(id);
        return await this.recurrencyRepository.save({ ...recurrency, ...recurrencyData });
    }

    async remove(id: string): Promise<void> {
        const recurrency = await this.findOne(id);
        await this.recurrencyRepository.remove(recurrency);
    }
}
