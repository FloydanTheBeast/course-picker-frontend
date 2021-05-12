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
	background-color: #3498db;
	padding: 12px 16px;
	width: auto;
	border: none;
	transition: all 0.3s;
	border-radius: 25px;

	&:hover {
		cursor: pointer;
		background-color: #207bb8;
		border-radius: 0;
	}
`;

export default StyledButton;
