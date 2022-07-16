interface IAccessToken {
	accessToken: string;
}

interface IPayload {
	sub: number;
	email: string;
}

export {IAccessToken, IPayload};
