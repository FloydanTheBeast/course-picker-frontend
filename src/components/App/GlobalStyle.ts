import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	html, body {
		height: 100%;
	}
	
	*::-webkit-scrollbar {
		width: 8px;

		&-track {
			background-color: #e0e0e0;
		}

		&-thumb {
			background-color: #888;
			border-radius: 8px;
		}
	}

	body {
		font-family: 'Roboto', "PT Sans", 'Helvetica Neue', sans-serif;
		overflow-x: hidden;
	}

	#root {
		display: flex;
		flex-flow: column nowrap;
		min-height: 100%;
	}

	a {
		text-decoration: none;
		color: #3498DB;
	}

	h1 {
		color: #333;
	}

	h2 {
		color: #555	;
	}

	p {
		font-weight: 200;
		color: #888;
	}

	span {
		font-weight: 200;
	}

	input::placeholder,
	textarea::placeholder {
		font-weight: 200;
	}

	label {
		color: #555;
	}

	.content-container {
		flex: 1 0 auto;
		width: 70%;
		margin: 0 auto;
		padding: 2rem 0;
	}

	@media (max-width: 768px) {
		.content-container {
			width: 90%;
		}
	}
`;

export default GlobalStyle;
