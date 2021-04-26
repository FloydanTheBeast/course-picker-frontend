import Button from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
	color: #fff;
	background: #000;
	padding: 12px 16px;
	border-radius: 12px;
	width: auto;

	&:hover {
		cursor: pointer;
	}
`;

export default StyledButton;
