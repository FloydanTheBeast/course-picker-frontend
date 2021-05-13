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

	& svg {
		width: 20px;
		height: 20px;
		padding: 8px;
		background-color: #333;
		border-radius: 50%;
		fill: #fff;
		transition: all 0.2s;
		overflow: visible;
		margin-left: 8px;

		&:hover {
			cursor: pointer;
			fill: #333;
			background-color: #fff;
		}
	}
`;

export const NavItem = styled(NavLink)`
	color: #333;
	margin: 8px;
	font-weight: 600;
	border-bottom: 2px solid;
	transition: color 0.15s;

	&:hover {
		color: #fff;
	}

	&.active {
		color: #888;
		cursor: default;
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
