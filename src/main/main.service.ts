import { Injectable, Logger } from '@nestjs/common';
import { DatabaseProvider, User, SchoolProfileUser } from 'sigasac-db';

import { UserUpdateDto, UserCreateDto } from './dto';

@Injectable()
export class MainService {
    async create(userCreateDto: UserCreateDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const user = await connection
                .getRepository(User)
                .save(userCreateDto);

            if (userCreateDto.schoolId) {
                await connection.getRepository(SchoolProfileUser).save({
                    schoolId: userCreateDto.schoolId,
                    profileId: userCreateDto.profileId,
                    userId: user.id
                });
            }

            return user;
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
