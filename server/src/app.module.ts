import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma';
import {AuthModule} from './auth';
import {UserModule} from './user';
import {CategoryModule} from './category';
import {NoteModule} from './note/note.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		AuthModule,
		UserModule,
		CategoryModule,
		PrismaModule,
		NoteModule,
	],
})
class AppModule {}

export {AppModule};
