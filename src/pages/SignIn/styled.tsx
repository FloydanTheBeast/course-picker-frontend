import styled from "styled-components";

const Label = styled.label`
	margin-bottom: 8px;
`;

const SignInForm = styled.form`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-flow: column;
	width: 40%;
	min-width: 200px;
	max-width: 600px;

	& > input {
		margin-bottom: 20px;
	}

	& > button {
		width: 60%;
		min-width: 200px;
		max-width: 300px;
		margin: 0 auto;
	}
`;

export { SignInForm, Label };
