import {ApiProperty} from '@nestjs/swagger';

class BadRequestResponseDto {
	@ApiProperty()
	statusCode: number;

	@ApiProperty()
	message: [string];

	@ApiProperty()
	error: string;
}

export {BadRequestResponseDto};
