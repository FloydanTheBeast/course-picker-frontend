import axios from "axios";

export interface SignUpData {
	email: string;
	username: string;
	password: string;
}

export interface SignInEmailData {
	email?: string;
	password: string;
}

export interface SignInUsernameData {
	username?: string;
	password: string;
}

export type SignInData = SignInEmailData & SignInUsernameData;

export class AuthService {
	private static api = axios.create({
		baseURL: "https://mooc.ij.je/auth"
	});

	static signup(data: SignUpData) {
		return this.api.post("/signup", data);
	}

	static signin(data: SignInData) {
		return this.api.post("/signin", data);
	}
}
