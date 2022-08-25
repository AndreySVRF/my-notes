import {ApiProperty} from '@nestjs/swagger';

class CategoryUpdateResponsePutDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;

	@ApiProperty()
	title: string;

	@ApiProperty()
	iconColor: string;

	@ApiProperty()
	userId: number;
}

export {CategoryUpdateResponsePutDto};
