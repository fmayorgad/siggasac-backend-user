import { Module } from '@nestjs/common';

import { AuthModule } from 'sigasac-utils';

import { MainModule } from './main/main.module';
import { RecoverPasswordModule } from './recover-password/recover-password.module';

@Module({
    imports: [AuthModule, MainModule, RecoverPasswordModule],
    controllers: [],
    providers: []
})
export class AppModule {}
