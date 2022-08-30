import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

class NoteUpdateRequestPutDto {
	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	id: number;

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

export {NoteUpdateRequestPutDto};
