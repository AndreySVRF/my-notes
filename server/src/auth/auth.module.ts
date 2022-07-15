import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PrismaModule} from '../prisma';

@Module({
	imports: [PrismaModule],
	controllers: [AuthController],
	providers: [AuthService],
})
class AuthModule {}

export {AuthModule};
