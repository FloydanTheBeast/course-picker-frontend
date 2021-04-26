import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavContainer = styled.nav`
	width: 100%;
	/* padding: 1rem; */
	background: #000;
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

export const NavGroup = styled.div``;

export const NavItem = styled(Link)`
	display: inline-block;
	transition: color 0.2s;
	color: #ccc;
	padding: 8px;

	&:hover {
		color: #fff;
	}
`;
