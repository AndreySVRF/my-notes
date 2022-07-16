import {PrismaService} from '../prisma';
import {UserUpdatePatchDto} from './dto';
import {Injectable} from '@nestjs/common';

@Injectable()
class UserService {
	constructor(private prisma: PrismaService) {}

	async update(id: number, dto: UserUpdatePatchDto) {
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
