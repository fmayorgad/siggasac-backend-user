import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RecoverPasswordDTO {
    @IsEmail()
    @ApiProperty({
        required: false,
        description:
            'Email al cual se enviará la contraseña temporal (sólo para recuperación)'
    })
    email: string;

    @ApiProperty({
        required: false,
        description: 'Nueva contraseña (ingresada por el usuario)'
    })
    password?: string;
}
