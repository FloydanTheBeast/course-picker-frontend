import LogoIcon from "icons/logo.svg";
import { useAuth } from "providers/authProvider";
import React from "react";
import Compilations from "./Compilations";
import { Container, Landing } from "./styled";

const HomePage = () => {
	const {
		authState: { isAuthenticated, user }
	} = useAuth();

	document.title = "MOOC · Платформа для поиска курсов";

	return isAuthenticated ? (
		<Container>
			<h1>
				Добро пожаловать, <span>{user.username}</span>
			</h1>
			<p>
				Мы подготовили специальные подборки по различным тематикам,
				посмотрите что там
			</p>
			<Compilations />
		</Container>
	) : (
		<Landing>
			<LogoIcon />
			<h1>
				<span>MOOC</span> - платформа-агрегатор для поиска необходимых
				Вам курсов
			</h1>
			<p>Для использования сервиса необходима авторизация</p>
		</Landing>
	);
};

export default HomePage;
