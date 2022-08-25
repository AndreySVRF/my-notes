import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

class CategoryCreateRequestPostDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	userId: number;

	@IsString()
	@ApiProperty()
	iconColor: string;
}

export {CategoryCreateRequestPostDto};
