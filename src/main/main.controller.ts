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

import { MainService } from './main.service';
import { UserUpdateDto } from './dto';

@Controller(`${USERS.apiBasePath}/${USERS.subRoutes.main}`)
@ApiTags(`${USERS.subRoutes.main}`)
@ApiBearerAuth()
export class MainController {
    constructor(private readonly mainService: MainService) {}

    @Put()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    @Roles(
        AUX_CONTADOR,
        CONTADOR,
        SUPER_ADMIN,
        SUPER_ADMIN_MINEDU,
        SUPER_ADMIN_SCHOOL
    )
    async update(
        @Res() res: Response,
        @User('sub') sub: number,
        @Body() userUpdateDto: UserUpdateDto
    ) {
        try {
            await this.mainService.update(sub, userUpdateDto);

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
