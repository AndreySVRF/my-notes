import {Module} from '@nestjs/common';
import {AuthModule} from './auth';
import {UserModule} from './user';
import {CategoryModule} from './category';
import {PrismaModule} from './prisma';

@Module({
	imports: [AuthModule, UserModule, CategoryModule, PrismaModule],
})
class AppModule {}

export {AppModule};
