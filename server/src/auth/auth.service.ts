import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma';

@Injectable({})
class AuthService {
	constructor(private prisma: PrismaService) {}

	signup() {
		return {msg: 'signup'};
	}

	signin() {
		return {msg: 'signin'};
	}
}

export {AuthService};
