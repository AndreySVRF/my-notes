import {ApiProperty} from '@nestjs/swagger';

class AuthSignupResponsePostDto {
	@ApiProperty()
	accessToken: string;
}

export {AuthSignupResponsePostDto};
