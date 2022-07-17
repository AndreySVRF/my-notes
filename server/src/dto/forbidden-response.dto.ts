import {ApiProperty} from '@nestjs/swagger';

class ForbiddenResponseDto {
	@ApiProperty()
	statusCode: number;

	@ApiProperty()
	message: string;

	@ApiProperty()
	error: string;
}

export {ForbiddenResponseDto};
