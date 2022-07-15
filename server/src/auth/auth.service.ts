import {ForbiddenException, Injectable} from '@nestjs/common';
import * as argon from 'argon2';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import {PrismaService} from '../prisma';
import {AuthDto} from './dto';

const CREDENTIALS_TAKEN = 'Credentials taken';

@Injectable({})
class AuthService {
	constructor(private prisma: PrismaService) {}

	async signup(dto: AuthDto) {
		const hash = await argon.hash(dto.password);

		try {
			const user = await this.prisma.user.create({
				data: {
					email: dto.email,
					password: hash,
					firstName: dto.firstName,
					lastName: dto.lastName,
				},
			});

			delete user.password;

			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException(CREDENTIALS_TAKEN);
				}
			}
			throw error;
		}
	}

	signin() {
		return {msg: 'signin'};
	}
}

export {AuthService};
