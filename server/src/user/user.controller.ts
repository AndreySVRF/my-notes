import {Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import {User} from '@prisma/client';
import {JwtGuard} from '../auth/guard';
import {GetUser} from '../auth/decorator';
import {UserService} from './user.service';
import {UserUpdateRequestPatchDto, UserUpdateResponsePatchDto} from './dto';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {BadRequestResponseDto, ForbiddenResponseDto} from '../dto';
import {UserGetMeRequestGetDto} from './dto/user-get-me-request-get.dto';
import {UserGetMeResponseGetDto} from './dto/user-get-me-response-get.dto';

@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('api/users')
class UserController {
	constructor(private userService: UserService) {}

	@ApiOperation({summary: 'Get info self'})
	@ApiResponse({
		status: 200,
		description: 'Successful',
		type: UserGetMeResponseGetDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		type: BadRequestResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden',
		type: ForbiddenResponseDto,
	})
	@Get('me')
	getMe(@GetUser() user: UserGetMeRequestGetDto): UserGetMeResponseGetDto {
		return user;
	}

	@ApiOperation({summary: 'User update'})
	@ApiResponse({
		status: 200,
		description: 'Updated successful',
		type: UserUpdateResponsePatchDto,
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		type: BadRequestResponseDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden',
		type: ForbiddenResponseDto,
	})
	@ApiBody({type: UserUpdateRequestPatchDto})
	@Patch('me')
	update(
		@GetUser('id') id: number,
		@Body() dto: UserUpdateRequestPatchDto
	): Promise<User> {
		return this.userService.update(id, dto);
	}
}

export {UserController};
