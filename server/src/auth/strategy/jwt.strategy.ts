import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {IPayload} from '../auth.service.interfase';
import {PrismaService} from '../../prisma';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(config: ConfigService, private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('JWT_SECRET'),
		});
	}

	async validate(payload: IPayload) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: payload.sub,
			},
		});

		delete user.password;

		return user;
	}
}

export {JwtStrategy};
