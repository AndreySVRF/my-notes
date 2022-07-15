import {ForbiddenException, Injectable} from '@nestjs/common';
import * as argon from 'argon2';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import {PrismaService} from '../prisma';
import {AuthSigninPostDto, AuthSignupPostDto} from './dto';

const CREDENTIALS_TAKEN = 'Credentials taken';
const USER_EMAIL_NOT_FOUND = 'User with this email not found';
const INCORRECT_PASSWORD = 'Incorrect password';

@Injectable({})
class AuthService {
	constructor(private prisma: PrismaService) {}

	async signup(dto: AuthSignupPostDto) {
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

	async signin(dto: AuthSigninPostDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			},
		});

		if (!user) {
			throw new ForbiddenException(USER_EMAIL_NOT_FOUND);
		}

		const pwMatches = await argon.verify(user.password, dto.password);

		if (!pwMatches) {
			throw new ForbiddenException(INCORRECT_PASSWORD);
		}

		delete user.password;

		return user;
	}
}

export {AuthService};
