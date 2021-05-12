import styled from "styled-components";

export const Container = styled.div`
	& h1 {
		color: #333;

		& > span {
			color: #888;
			border-bottom: 2px solid #888;
		}
	}
`;
