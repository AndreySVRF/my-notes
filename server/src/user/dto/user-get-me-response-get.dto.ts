import {ApiProperty} from '@nestjs/swagger';

class UserGetMeResponseGetDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	createdAt: string;

	@ApiProperty()
	updatedAt: string;

	@ApiProperty()
	email: string;

	@ApiProperty()
	firstName: string;

	@ApiProperty()
	lastName: string;
}

export {UserGetMeResponseGetDto};
