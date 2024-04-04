import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Installment } from './installment.entity';

@Injectable()
export class InstallmentService {
    constructor(
        @InjectRepository(Installment)
        private readonly installmentRepository: Repository<Installment>,
    ) {}

    async create(installmentData: Partial<Installment>): Promise<Installment> {
        const installment = this.installmentRepository.create(installmentData);
        return await this.installmentRepository.save(installment);
    }

    async findAll(): Promise<Installment[]> {
        return await this.installmentRepository.find();
    }

    async findOne(id: string): Promise<Installment> {
        const installmentId: FindOneOptions<Installment> = {where: {id}}
        const installment = await this.installmentRepository.findOne(installmentId);
        if (!installment) {
            throw new NotFoundException('Installment not found');
        }
        return installment;
    }

    async update(id: string, installmentData: Partial<Installment>): Promise<Installment> {
        const installment = await this.findOne(id);
        return await this.installmentRepository.save({ ...installment, ...installmentData });
    }

    async remove(id: string): Promise<void> {
        const installment = await this.findOne(id);
        await this.installmentRepository.remove(installment);
    }
}
