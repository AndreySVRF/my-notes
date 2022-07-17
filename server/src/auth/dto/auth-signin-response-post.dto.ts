import {ApiProperty} from '@nestjs/swagger';

class AuthSigninResponsePostDto {
	@ApiProperty()
	accessToken: string;
}

export {AuthSigninResponsePostDto};
