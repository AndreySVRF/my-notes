import {IsNotEmpty, IsString} from 'class-validator';

class UserUpdatePatchDto {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	lastName: string;
}

export {UserUpdatePatchDto};
