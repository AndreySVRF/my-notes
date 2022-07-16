import {Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import {User} from '@prisma/client';
import {JwtGuard} from '../auth/guard';
import {GetUser} from '../auth/decorator';
import {UserService} from './user.service';
import {UserUpdatePatchDto} from './dto';

@UseGuards(JwtGuard)
@Controller('users')
class UserController {
	constructor(private userService: UserService) {}

	@Get('me')
	getMe(@GetUser() user: User) {
		return user;
	}

	@Patch('me')
	update(@GetUser('id') id: number, @Body() dto: UserUpdatePatchDto) {
		return this.userService.update(id, dto);
	}
}

export {UserController};
