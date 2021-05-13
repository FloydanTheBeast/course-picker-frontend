import LogoIcon from "icons/logo.svg";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoLink = styled(Link)`
	display: flex;

	& svg {
		width: 40px;
		transition: all 0.3s;

		& .logo_svg__logo-text {
			transition: fill 0.3s;
		}

		&:hover {
			fill: #fff;
			transform: scale(1.2);

			& .logo_svg__logo-text {
				fill: #000;
			}
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
