import React from "react";
import styled from "styled-components";

enum ButtonTypes {
	"button",
	"submit",
	"reset"
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
	type?: keyof typeof ButtonTypes;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }: ButtonProps) => {
	return <button {...props}>{children}</button>;
};

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
