import Logo from "components/Logo";
import React from "react";
import { NavContainer, NavGroup, NavItem } from "./styled";

const Navigation = () => {
	return (
		<NavContainer>
			<Logo />
			<NavGroup>
				<NavItem to="/signup">Регистрация</NavItem>
				<NavItem to="/signin">Вход</NavItem>
			</NavGroup>
		</NavContainer>
	);
};

export default Navigation;
