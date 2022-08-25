import {ApiProperty} from '@nestjs/swagger';

class NoteCreateResponsePostDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	title: string;

	@ApiProperty()
	description: string;

	@ApiProperty()
	categoryId: number;
}

export {NoteCreateResponsePostDto};
