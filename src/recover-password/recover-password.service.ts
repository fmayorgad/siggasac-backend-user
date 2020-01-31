import { Injectable } from '@nestjs/common';

import { DatabaseProvider, User, UserLog } from 'sigasac-db';

import { DatesHelper } from 'sigasac-utils';

import { passwordGenerator } from './functions';

@Injectable()
export class RecoverPasswordService {
    async recoverPassword(email: string) {
        try {
            const pass = passwordGenerator();

            await this.changePassword(0, email, pass, true);
        } catch (error) {
            throw error;
        }
    }

    async changePasswordUser(id: number, password: string) {
        try {
            await this.changePassword(id, '', password, false);
        } catch (error) {
            throw error;
        }
    }

    private async changePassword(
        id: number,
        email: string,
        password: string,
        isRecover: boolean
    ) {
        try {
            const connection = await DatabaseProvider.getConnection();

            let user: User;

            if (id && !email) {
                user = await connection
                    .getRepository(User)
                    .findOne({ where: { id } });
            }

            if (!id && email) {
                user = await connection
                    .getRepository(User)
                    .findOne({ where: { email } });
            }

            if (user) {
                user.password = password;

                await connection.getRepository(User).save(user);

                const userLog: UserLog = await connection
                    .getRepository(UserLog)
                    .findOne({ where: { userId: user.id } });

                const passwordUpdateDate = new Date();

                if (isRecover) {
                    userLog.updatedPassword = 1;
                    userLog.passwordUpdateDate = passwordUpdateDate;
                    userLog.updatedPasswordExpirationDate = new Date(
                        DatesHelper.addDayToDate(passwordUpdateDate)
                    );

                    await connection.getRepository(UserLog).save(userLog);
                }

                if (!isRecover) {
                    userLog.updatedPassword = 0;
                    userLog.passwordUpdateDate = passwordUpdateDate;
                    userLog.updatedPasswordExpirationDate = passwordUpdateDate;

                    await connection.getRepository(UserLog).save(userLog);
                }
            }
        } catch (error) {
            throw error;
        }
    }
}
