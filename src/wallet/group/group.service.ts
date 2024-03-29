import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
    ) {}

    async create(groupData: Partial<Group>): Promise<Group> {
        const group = this.groupRepository.create(groupData);
        return await this.groupRepository.save(group);
    }

    async findAll(): Promise<Group[]> {
        return await this.groupRepository.find();
    }

    async findOne(id: string): Promise<Group> {
        const groudId: FindOneOptions<Group> = {where: {id}}
        const group = await this.groupRepository.findOne(groudId);
        if (!group) {
            throw new NotFoundException('Group not found');
        }
        return group;
    }

    async update(id: string, groupData: Partial<Group>): Promise<Group> {
        const group = await this.findOne(id);
        return await this.groupRepository.save({ ...group, ...groupData });
    }

    async remove(id: string): Promise<void> {
        const group = await this.findOne(id);
        await this.groupRepository.remove(group);
    }
}
