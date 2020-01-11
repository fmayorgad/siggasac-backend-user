import { Injectable } from '@nestjs/common';

import { DatabaseProvider, User, UserLog } from 'sigasac-db';

import { passwordGenerator } from './functions';

@Injectable()
export class RecoverPasswordService {
    async recoverPassword(email: string, password?: string) {
        try {
            if (password) {
                this.changePassword(email, password, false);
            }

            if (!password) {
                const pass = passwordGenerator();

                this.changePassword(email, pass, true);
            }
        } catch (error) {
            throw error;
        }
    }

    private async changePassword(
        email: string,
        password: string,
        isRecover: boolean
    ) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const user: User = await connection
                .getRepository(User)
                .findOne({ where: { email } });

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
                        passwordUpdateDate.setDate(
                            passwordUpdateDate.getDate() + 1
                        )
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
