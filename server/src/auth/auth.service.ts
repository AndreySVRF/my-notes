import {Injectable} from '@nestjs/common';

@Injectable({})
class AuthService {
	signup() {
		return {msg: 'signup'};
	}

	signin() {
		return {msg: 'signin'};
	}
}

export {AuthService};
