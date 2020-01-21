import { Injectable, Logger } from '@nestjs/common';
import { DatabaseProvider, User } from 'sigasac-db';

import { UserUpdateDto } from './dto';

@Injectable()
export class MainService {
    async create() {
        try {
            const connection = await DatabaseProvider.getConnection();
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
