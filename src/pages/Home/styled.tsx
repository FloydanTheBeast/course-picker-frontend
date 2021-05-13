import styled from "styled-components";

export const Container = styled.div`
	& h1 > span {
		border-bottom: 2px solid #888;
	}
`;

export const Landing = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	& > svg {
		width: 200px;
	}

	& > h1 {
		font-size: 25px;
		margin: 24px 0 12px 0;
		text-align: center;
		color: #333;

		& > span {
			font-size: 30px;
			font-weight: bold;
			color: #000;
			vertical-align: middle;
		}
	}

	& > p {
		margin: 0;
		font-size: 18px;
		text-align: center;
	}
`;
