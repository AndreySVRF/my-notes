import {Module} from '@nestjs/common';
import {AuthModule} from './auth';
import {UserModule} from './user';
import {CategoryModule} from './category';

@Module({
	imports: [AuthModule, UserModule, CategoryModule],
})
class AppModule {}

export {AppModule};
