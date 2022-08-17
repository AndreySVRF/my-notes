import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {UserGetMeResponseGetDto} from '../../user/dto/user-get-me-response-get.dto';

const GetUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext) => {
		const user = ctx.switchToHttp().getRequest()
			.user as UserGetMeResponseGetDto;

		if (data) {
			return user[data];
		}

		return user;
	}
);

export {GetUser};
