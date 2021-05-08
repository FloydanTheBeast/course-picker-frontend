import { Container } from "./styled";
import { useAuth } from "providers/authProvider";
import React from "react";
import Compilations from "./Compilations";

const HomePage = () => {
	const {
		authState: {
			isAuthenticated,
			user: { username }
		}
	} = useAuth();

	return (
		<Container>
			{isAuthenticated ? (
				<>
					<h1>
						Добро пожаловать, <span>{username}</span>!
					</h1>
					<Compilations />
				</>
			) : (
				<h1>Вы не авторизованы</h1>
			)}
		</Container>
	);
};

export default HomePage;
