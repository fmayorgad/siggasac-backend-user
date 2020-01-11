import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class RecoverPasswordDTO {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description:
            'Email al cual se enviará el correo de recuperación (asociado a una cuenta)'
    })
    email: string;

    @ApiProperty({
        required: false,
        description: 'Nueva contraseña (ingresada por el usuario)'
    })
    password?: string;
}
