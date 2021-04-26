import Navigation from "@components/Navigation";
import HomePage from "@pages/Home";
import SignUpPage from "@pages/SignUp";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Helvetica Neue', sans-serif;
	}

	a {
		text-decoration: none;
	}
`;

class App extends Component {
	render(): React.ReactNode {
		return (
			<>
				<BrowserRouter>
					<Switch>
						<Route path="/signup">
							<SignUpPage />
						</Route>
						<Route path="/">
							<Navigation />
							<HomePage />
						</Route>
					</Switch>
				</BrowserRouter>
				<GlobalStyle />
			</>
		);
	}
}

export default App;
