import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled(Link)`
	color: #888;
	font-size: 36px;
	font-weight: bold;
	transition: color 0.2s;

	&:hover {
		color: #fff;
	}
`;

const Logo: React.FC = () => {
	return (
		<StyledLogo className="app-logo" to="/">
			MOOC
		</StyledLogo>
	);
};

export default Logo;
