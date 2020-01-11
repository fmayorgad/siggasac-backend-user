import { Controller } from '@nestjs/common';

import { RecoverPasswordService } from './recover-password.service';

@Controller('users/v1/recover-password')
export class RecoverPasswordController {
    constructor(
        private readonly recoverPasswordService: RecoverPasswordService
    ) {}
}
