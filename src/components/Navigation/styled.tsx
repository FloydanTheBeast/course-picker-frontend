import ProfileIcon from "icons/user.svg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.nav`
	width: 100%;
	/* padding: 1rem; */
	background: #ffd7ba;
	height: 64px;
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: space-between;
	text-transform: uppercase;
	font-size: 14px;
	padding: 0 20px;
	box-sizing: border-box;

	& .app-logo {
		padding: 8px;
	}
`;

export const NavGroup = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
`;

export const NavItem = styled(NavLink)`
	display: inline-block;
	transition: color 0.2s;
	color: #ccc;
	padding: 8px;

	&:hover {
		color: #fff;
	}

	&.active {
		color: #fff;
		cursor: default;
	}
`;

export const MenuIcon = styled(ProfileIcon)`
	fill: #888;
	width: 30px;
	height: 30px;
	transition: fill 0.2s;

	&:hover {
		fill: #fff;
		cursor: pointer;
	}
`;

export const StyledTooltipMenuContent = styled.div`
	a {
		display: block;
		box-sizing: border-box;
		width: 100%;
		padding: 8px;
		transition: all 0.2s;

		&:hover {
			color: #fff;
			background-color: #3498db;
		}
	}
	.tootlip-menu {
		&_logout {
			color: #e74c3c;

			&:hover {
				color: #fff;
				background-color: #e74c3c;
				cursor: pointer;
			}
		}
	}
`;
