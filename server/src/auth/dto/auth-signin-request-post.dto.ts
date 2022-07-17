import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

class AuthSigninRequestPostDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;
}

export {AuthSigninRequestPostDto};
