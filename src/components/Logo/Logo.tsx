import LogoIcon from "icons/logo.svg";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoLink = styled(Link)`
	display: flex;

	& svg {
		width: 40px;
		transition: fill 0.3s;
		&:hover {
			fill: #555;
		}
	}
`;

const Logo: React.FC = () => {
	return (
		<LogoLink to="/">
			<LogoIcon />
		</LogoLink>
	);
};

export default Logo;
