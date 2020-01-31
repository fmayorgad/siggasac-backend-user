import { Injectable, Logger } from '@nestjs/common';
import { DatabaseProvider, User } from 'sigasac-db';

import { UserUpdateDto, UserCreateDto } from './dto';

@Injectable()
export class MainService {
    async create(userCreateDto: UserCreateDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(User).save(userCreateDto);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, userUpdateDto: UserUpdateDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(User)
                .set(userUpdateDto)
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
