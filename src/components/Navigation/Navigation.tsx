import Logo from "components/Logo";
import Search from "components/Search";
import withTooltip from "components/Tooltip";
import ProfileIcon from "icons/user.svg";
import { useAuth } from "providers/authProvider";
import React from "react";
import { Link } from "react-router-dom";
import {
	NavContainer,
	NavGroup,
	NavItem,
	StyledTooltipMenuContent
} from "./styled";

const TooltipMenuContent = () => {
	const { logout } = useAuth();

	return (
		<StyledTooltipMenuContent className="tooltip-menu">
			<Link to="/profile">Профиль</Link>
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

	const ProfileTooltip = withTooltip(
		<ProfileIcon />,
		<TooltipMenuContent />,
		{
			offsetTop: 10
		}
	);

	return (
		<NavContainer>
			<Logo />
			<NavGroup>
				{isAuthenticated ? (
					<>
						<Search />
						<ProfileTooltip />
					</>
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
