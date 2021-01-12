import { Injectable, HttpStatus, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UsersDTO } from './users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    async index() {
        return await this.usersRepository.find();
    }

    async create(@Body() data: UsersDTO) {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(data)
        return user;
    }

    async show(id: number): Promise<UsersDTO> {
        return await this.usersRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, data: UsersDTO) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ id });
    }

    async destroy(id: number) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
    }
}
