import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    surname?: string;

    @ApiProperty({ required: false })
    phone?: string;

    @ApiProperty({ required: false })
    cellphone?: string;
}
