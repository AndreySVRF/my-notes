import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthSigninPostDto, AuthSignupPostDto} from './dto';

@Controller('auth')
class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signup(@Body() dto: AuthSignupPostDto) {
		return this.authService.signup(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Post('signin')
	signin(@Body() dto: AuthSigninPostDto) {
		return this.authService.signin(dto);
	}
}

export {AuthController};
