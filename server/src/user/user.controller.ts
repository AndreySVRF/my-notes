import {Controller, Get, Patch, UseGuards} from '@nestjs/common';
import {User} from '@prisma/client';
import {JwtGuard} from '../auth/guard';
import {GetUser} from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
class UserController {
	@Get('me')
	getMe(@GetUser() user: User) {
		return user;
	}

	@Patch()
	editUser() {}
}

export {UserController};
