import styled from "styled-components";

export const ProfileContainer = styled.div`
	& > div {
		margin-bottom: 20px;
	}
`;

export const ProfileHeader = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

	& .user {
		&-icon {
			width: 64px;
			margin-right: 20px;
		}

		&-info {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;

			& p {
				color: #888;
				margin: 0;
			}

			&_field {
				color: #333;
			}
		}
	}
`;
