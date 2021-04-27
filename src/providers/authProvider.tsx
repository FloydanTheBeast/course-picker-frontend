import { AxiosResponse } from "axios";
import React, { createContext, useContext, useState } from "react";
import { AuthService, SignUpData } from "services/auth";

interface AuthProps {
	children: React.ReactNode;
}

interface AuthContext {
	isAuthenticated: boolean;
	setIsAuthenticated: (value: boolean) => void;
	signup: (data: SignUpData) => Promise<AxiosResponse<any>>;
}

const AuthContext = createContext({} as AuthContext);

const AuthContextProvider: React.FC<AuthProps> = ({ children }: AuthProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	// TODO: Вызов API
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				signup: AuthService.signup.bind(AuthService)
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
