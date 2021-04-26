import React, { Component } from "react";
import SignUpPage from "../../pages/SignUp";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Helvetica Neue', sans-serif;
	}
`;

class App extends Component {
	render(): React.ReactNode {
		return (
			<>
				<SignUpPage />
				<GlobalStyle />
			</>
		);
	}
}

export default App;
