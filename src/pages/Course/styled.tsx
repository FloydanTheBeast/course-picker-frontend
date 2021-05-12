import styled from "styled-components";

export const CourseContainer = styled.div`
	max-width: 600px;
	margin: 0 auto;

	& h2,
	& span {
		font-size: 20px;
	}

	p {
		color: #888;
	}

	hr {
		border: none;
		background: #ddd;
		height: 1px;
	}
`;

export const CourseHeader = styled.div<{ previewImageLink: string }>`
	height: 300px;
	position: relative;
	background-image: url(${(props) => props.previewImageLink});
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;

	& .header_darken {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
	}

	& h1 {
		width: 100%;
		box-sizing: border-box;
		text-align: center;
		color: #fff;
		position: absolute;
		bottom: 50%;
		transform: translateY(50%);
		margin: 0;
		padding: 0 20px;
	}
`;

export const CourseBody = styled.div`
	padding: 20px 0;
`;

export const CourseBlock = styled.div<{ horizontal?: boolean }>`
	${(props) =>
		props.horizontal ? `display: flex; flex-flow: row nowrap` : ``};

	& > div {
		flex-grow: 1;
	}
`;

export const CourseSubblock = styled.div<{ alignRight?: boolean }>`
	display: flex;
	flex-flow: column nowrap;
	margin-bottom: 10px;

	${({ alignRight }) => (alignRight ? `align-items: flex-end` : ``)};
`;

export const CourseStatusBlock = styled.div`
	display: flex;
	flex-flow: row nowrap;
	align-items: flex-start !important;
	justify-content: flex-end;

	& svg {
		width: 30px;
		margin-left: 8px;
		fill: #ccc;
		transition: fill 0.2s;

		&:hover {
			cursor: pointer;
			fill: #888;
		}

		&.like {
			&.active {
				fill: #e74c3c;
			}
		}

		&.view {
			&.active {
				fill: #555;
			}
		}
	}
`;

export const Property = styled.div`
	margin-bottom: 10px;

	& h2 {
		display: inline-block;
		margin: 0 10px 0 0;
	}

	& span {
		color: #555;
		margin-right: 8px;
		display: inline-block;
	}
`;

export const Categories = styled.div`
	display: flex;
	flex-flow: row wrap;
`;

export const Category = styled.div`
	border: 1px solid #aaa;
	padding: 5px 10px;
	border-radius: 16px;
	color: #888;
	margin: 0 10px 10px 0;
`;

export const LinkImage = styled.div`
	height: 100%;

	& img {
		width: 40px;
		margin-right: 8px;
	}

	& a {
		line-height: 40px;
		vertical-align: top;
	}
`;
