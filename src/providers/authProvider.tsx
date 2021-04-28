import { AxiosResponse } from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { AuthService, SignInData, SignUpData } from "services/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

interface AuthProps {
	children: React.ReactNode;
}

interface AuthState {
	isAuthenticated: boolean;
	accessToken?: string;
	refreshToken?: string;
}

enum ActionTypes {
	"signin",
	"logout"
}

interface AuthActionPayload {
	accessToken: string;
	refreshToken: string;
}

interface AuthAction {
	type: keyof typeof ActionTypes;
	payload?: AuthActionPayload;
}

const authReducer = (authState: AuthState, action: AuthAction): AuthState => {
	let newAuthState = Object.assign({}, authState);

	switch (action.type) {
		case "signin":
			localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.accessToken);
			localStorage.setItem(
				REFRESH_TOKEN_KEY,
				action.payload.refreshToken
			);

			newAuthState = Object.assign(
				{ isAuthenticated: true },
				action.payload
			);

			return newAuthState;
		case "logout":
			return { isAuthenticated: false };
	}
};

interface AuthContext {
	authState: AuthState;
	dispatchAuthState: React.Dispatch<AuthAction>;
	signup: (data: SignUpData) => Promise<AxiosResponse<any>>;
	signin: (data: SignInData) => Promise<AxiosResponse<any>>;
}

const AuthContext = createContext({} as AuthContext);

const AuthContextProvider: React.FC<AuthProps> = ({ children }: AuthProps) => {
	const [authState, dispatchAuthState] = useReducer(
		authReducer,
		((): AuthState => {
			const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

			return accessToken && refreshToken
				? {
						isAuthenticated: true,
						accessToken,
						refreshToken
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }
				: { isAuthenticated: false };
		})()
	);

	// TODO: Вызов API
	return (
		<AuthContext.Provider
			value={{
				authState,
				dispatchAuthState,
				signup: AuthService.signup.bind(AuthService),
				signin: AuthService.signin.bind(AuthService)
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
