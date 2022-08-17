import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

class UserUpdateRequestPatchDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsString()
	@ApiProperty()
	lastName: string;
}

export {UserUpdateRequestPatchDto};
