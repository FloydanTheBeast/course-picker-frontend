import Logo from "components/Logo";
import React from "react";
import {
	NavContainer,
	NavGroup,
	NavItem,
	MenuIcon,
	StyledTooltipMenuContent
} from "./styled";
import { useAuth } from "providers/authProvider";
import withTooltip from "components/Tooltip";

const TooltipMenuContent = () => {
	const { logout } = useAuth();

	return (
		<StyledTooltipMenuContent className="tooltip-menu">
			<a
				onClick={() =>
					logout().catch(() => {
						return;
					})
				}
				className="tootlip-menu_logout"
			>
				Выход
			</a>
		</StyledTooltipMenuContent>
	);
};

const Navigation = () => {
	const {
		authState: { isAuthenticated }
	} = useAuth();

	return (
		<NavContainer>
			<Logo />
			<NavGroup>
				{isAuthenticated ? (
					withTooltip(<MenuIcon />, <TooltipMenuContent />, {
						offsetTop: 10
					})
				) : (
					<>
						<NavItem to="/signup">Регистрация</NavItem>
						<NavItem to="/signin">Вход</NavItem>{" "}
					</>
				)}
			</NavGroup>
		</NavContainer>
	);
};

export default Navigation;
