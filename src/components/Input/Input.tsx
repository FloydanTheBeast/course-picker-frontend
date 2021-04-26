import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const Input: React.FC<InputProps> = (props: InputProps) => {
	return <input {...props} />;
};

export default Input;
