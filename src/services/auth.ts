import axios from "axios";

export interface SignUpData {
	email: string;
	username: string;
	password: string;
}

export class AuthService {
	private static api = axios.create({
		baseURL: "http://localhost:8000/auth"
	});

	static signup(data: SignUpData) {
		console.log("test");
		return this.api.post("/signup", data);
	}
}
