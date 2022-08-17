import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {
	AuthSigninRequestPostDto,
	AuthSigninResponsePostDto,
	AuthSignupRequestPostDto,
	AuthSignupResponsePostDto,
} from './dto';
import {BadRequestResponseDto, ForbiddenResponseDto} from '../dto';

@ApiTags('Auth')
@Controller('api/auth')
class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({summary: 'User registration'})
	@ApiResponse({
		status: 201,
		description: 'Created',
		type: AuthSignupResponsePostDto,
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
	@ApiBody({type: AuthSignupRequestPostDto})
	@Post('signup')
	signup(
		@Body() dto: AuthSignupRequestPostDto
	): Promise<AuthSignupResponsePostDto> {
		return this.authService.signup(dto);
	}

	@ApiOperation({summary: 'User login'})
	@ApiResponse({
		status: 200,
		description: 'Login access',
		type: AuthSigninResponsePostDto,
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
	@ApiBody({type: AuthSigninRequestPostDto})
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	signin(
		@Body() dto: AuthSigninRequestPostDto
	): Promise<AuthSigninResponsePostDto> {
		return this.authService.signin(dto);
	}
}

export {AuthController};
