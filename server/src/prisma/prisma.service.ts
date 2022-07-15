import {PrismaClient} from '@prisma/client';
import {Injectable} from '@nestjs/common';

@Injectable()
class PrismaService extends PrismaClient {
	constructor() {
		super({
			datasources: {
				db: {
					url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
				},
			},
		});
	}
}

export {PrismaService};
