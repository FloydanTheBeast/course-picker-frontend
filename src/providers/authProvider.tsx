import { AxiosResponse } from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { AuthService, SignInData, SignUpData } from "services/authService";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

interface AuthProps {
	children: React.ReactNode;
}

interface AuthState {
	isAuthenticated: boolean;
	accessToken?: string;
	refreshToken?: string;
	user?: UserData;
}

enum ActionTypes {
	"signin",
	"logout"
}

interface AuthActionPayload {
	accessToken: string;
	refreshToken: string;
	user: UserData;
}

interface AuthAction {
	type: keyof typeof ActionTypes;
	payload?: AuthActionPayload;
}

const authReducer = (authState: AuthState, action: AuthAction): AuthState => {
	let newAuthState = Object.assign({}, authState);

	switch (action.type) {
		case "signin":
			// TODO: Добавить слушателя для localStorage, выходить при изменении токенов или пользователя

			localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.accessToken);
			localStorage.setItem(
				REFRESH_TOKEN_KEY,
				action.payload.refreshToken
			);
			localStorage.setItem("user", JSON.stringify(action.payload.user));

			newAuthState = Object.assign(
				{ isAuthenticated: true },
				action.payload
			);

			return newAuthState;
		case "logout":
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			return { isAuthenticated: false };
	}
};

interface AuthContext {
	authState: AuthState;
	dispatchAuthState: React.Dispatch<AuthAction>;
	signup: (data: SignUpData) => Promise<AxiosResponse<any>>;
	signin: (data: SignInData) => Promise<AxiosResponse<any>>;
	logout: () => Promise<AxiosResponse<any>>;
}

const AuthContext = createContext({} as AuthContext);

const AuthContextProvider: React.FC<AuthProps> = ({ children }: AuthProps) => {
	const [authState, dispatchAuthState] = useReducer(
		authReducer,
		((): AuthState => {
			const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
			let user;

			try {
				user = JSON.parse(localStorage.getItem("user"));
			} catch (error) {
				return { isAuthenticated: false };
			}

			return accessToken && refreshToken && user?.username
				? {
						isAuthenticated: true,
						accessToken,
						refreshToken,
						user
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
				signin: AuthService.signin.bind(AuthService),
				logout: () => {
					const refreshToken = localStorage.getItem(
						REFRESH_TOKEN_KEY
					);

					dispatchAuthState({
						type: "logout"
					});

					return AuthService.logout(refreshToken);
				}
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, AuthContext, useAuth };
