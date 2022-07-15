import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma';
import {AuthModule} from './auth';
import {UserModule} from './user';
import {CategoryModule} from './category';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		UserModule,
		CategoryModule,
		PrismaModule,
	],
})
class AppModule {}

export {AppModule};
