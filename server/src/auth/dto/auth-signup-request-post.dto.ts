import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

class AuthSignupRequestPostDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsString()
	@ApiProperty({required: false})
	lastName?: string;
}

export {AuthSignupRequestPostDto};
