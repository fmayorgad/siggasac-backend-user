import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    Query,
    Patch,
    UseGuards,
    Logger
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { AuthGuard, USERS, User, ROLES, Roles } from 'sigasac-utils';
const {
    AUX_CONTADOR,
    CONTADOR,
    SUPER_ADMIN,
    SUPER_ADMIN_MINEDU,
    SUPER_ADMIN_SCHOOL
} = ROLES;

import { RecoverPasswordService } from './recover-password.service';
import { RecoverPasswordDTO } from './dto';

@Controller(`${USERS.apiBasePath}/${USERS.subRoutes.passwords}`)
@ApiTags(`${USERS.subRoutes.passwords}`)
export class RecoverPasswordController {
    constructor(
        private readonly recoverPasswordService: RecoverPasswordService
    ) {}

    @Put('/change')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Roles(
        AUX_CONTADOR,
        CONTADOR,
        SUPER_ADMIN,
        SUPER_ADMIN_MINEDU,
        SUPER_ADMIN_SCHOOL
    )
    async changePasswordUser(
        @Res() res: Response,
        @User('sub') sub: number,
        @Body() recoverPasswordDTO: RecoverPasswordDTO
    ) {
        try {
            await this.recoverPasswordService.changePasswordUser(
                sub,
                recoverPasswordDTO.password
            );

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Actualización exitosa!'
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Put('/recover')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    async recoverPasswordUser(
        @Res() res: Response,
        @Body() recoverPasswordDTO: RecoverPasswordDTO
    ) {
        try {
            await this.recoverPasswordService.recoverPassword(
                recoverPasswordDTO.email
            );

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Actualización exitosa!'
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }
}
