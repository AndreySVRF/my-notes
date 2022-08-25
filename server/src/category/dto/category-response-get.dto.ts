import {ApiProperty} from '@nestjs/swagger';

class CategoryResponseGetDto {
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

export {CategoryResponseGetDto};
