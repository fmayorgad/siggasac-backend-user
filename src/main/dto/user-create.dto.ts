import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserCreateDto {
    @ApiProperty({ required: true, description: 'Nombre del usuario' })
    name: string;

    @ApiProperty({ required: true, description: 'Correo del usuario' })
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, description: 'Contraseña del usuario' })
    password: string;

    @ApiProperty({ required: true, description: 'Perfil del usuario' })
    profileId: number;

    @ApiProperty({ required: false })
    schoolId?: number;

    @ApiProperty({ required: false, description: 'Apellido del usuario' })
    surname?: string;
}
