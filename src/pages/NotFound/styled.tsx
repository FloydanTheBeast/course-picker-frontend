import styled from "styled-components";

export const Container = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-flow: column nowrap;
`;

export const Header = styled.h1`
	margin: 0 0 20px 0;
	font-size: 120px;
	text-align: center;
`;

export const Text = styled.p`
	font-size: 40px;
	text-align: center;
	color: #ccc;
	margin: 0;
`;
