import {ForbiddenException, Injectable} from '@nestjs/common';
import * as argon from 'argon2';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime';
import {JwtService} from '@nestjs/jwt';
import {PrismaService} from '../prisma';
import {AuthSigninPostDto, AuthSignupPostDto} from './dto';
import {ConfigService} from '@nestjs/config';
import {IAccessToken} from './auth.service.interfase';

const CREDENTIALS_TAKEN = 'Credentials taken';
const USER_EMAIL_NOT_FOUND = 'User with this email not found';
const INCORRECT_PASSWORD = 'Incorrect password';

@Injectable({})
class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
		private config: ConfigService
	) {}

	async signup(dto: AuthSignupPostDto): Promise<IAccessToken> {
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

			return this.signToken(user.id, user.email);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException(CREDENTIALS_TAKEN);
				}
			}
			throw error;
		}
	}

	async signin(dto: AuthSigninPostDto): Promise<IAccessToken> {
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

		return this.signToken(user.id, user.email);
	}

	async signToken(userId: number, email: string): Promise<IAccessToken> {
		const payload = {
			sub: userId,
			email,
		};

		const timeout = this.config.get('JWT_TIMEOUT');
		const secret = this.config.get('JWT_SECRET');

		const token = await this.jwt.signAsync(payload, {
			expiresIn: timeout,
			secret,
		});

		return {
			accessToken: token,
		};
	}
}

export {AuthService};
