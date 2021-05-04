import Logo from "components/Logo";
import withTooltip from "components/Tooltip";
import { useAuth } from "providers/authProvider";
import React from "react";
import {
	MenuIcon,
	NavContainer,
	NavGroup,
	NavItem,
	StyledTooltipMenuContent
} from "./styled";

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

	const ProfileTooltip = withTooltip(<MenuIcon />, <TooltipMenuContent />, {
		offsetTop: 10
	});
	return (
		<NavContainer>
			<Logo />
			<NavGroup>
				{isAuthenticated ? (
					<ProfileTooltip />
				) : (
					<>
						<NavItem activeClassName="active" to="/signup">
							Регистрация
						</NavItem>
						<NavItem activeClassName="active" to="/signin">
							Вход
						</NavItem>
					</>
				)}
			</NavGroup>
		</NavContainer>
	);
};

export default Navigation;
