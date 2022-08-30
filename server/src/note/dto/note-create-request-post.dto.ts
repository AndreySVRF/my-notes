import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

class NoteCreateRequestPostDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsString()
	@ApiProperty()
	description: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	categoryId: number;
}

export {NoteCreateRequestPostDto};
