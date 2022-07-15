import {IsEmail, IsNotEmpty, IsString} from 'class-validator';

class AuthSigninPostDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export {AuthSigninPostDto};
