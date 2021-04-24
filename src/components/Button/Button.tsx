import React from "react";
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

export default Button;
