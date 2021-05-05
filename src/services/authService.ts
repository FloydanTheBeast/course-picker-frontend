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

export type RefreshToken = string;

export type SignInData = SignInEmailData & SignInUsernameData;

export class AuthService {
	private static api = axios.create({
		baseURL: "https://api.mooc.ij.je/auth"
	});

	static signup(data: SignUpData) {
		return this.api.post("/signup", data);
	}

	static signin(data: SignInData) {
		return this.api.post("/signin", data);
	}

	static refreshToken() {
		console.log("Refreshing token...");
		return this.api
			.post("/refresh-token", null, {
				headers: {
					"x-refresh-token": localStorage.getItem("refreshToken")
				}
			})
			.then(({ data }) => {
				localStorage.setItem("accessToken", data.accessToken);
				localStorage.setItem("refreshToken", data.refreshToken);
			});
	}

	static logout(refreshToken: RefreshToken) {
		return this.api
			.post("/logout", null, {
				headers: {
					"x-refresh-token": refreshToken
				}
			})
			.catch();
	}
}
