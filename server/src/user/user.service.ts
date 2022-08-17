import {PrismaService} from '../prisma';
import {UserUpdateRequestPatchDto} from './dto';
import {Injectable} from '@nestjs/common';
import {User} from '@prisma/client';

@Injectable()
class UserService {
	constructor(private prisma: PrismaService) {}

	async update(id: number, dto: UserUpdateRequestPatchDto): Promise<User> {
		try {
			const user = await this.prisma.user.update({
				where: {
					id,
				},
				data: {
					firstName: dto.firstName,
					lastName: dto.lastName,
				},
			});

			return user;
		} catch (error) {
			throw error;
		}
	}
}

export {UserService};
