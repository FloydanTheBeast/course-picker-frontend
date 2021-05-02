import Navigation from "components/Navigation";
import HomePage from "pages/Home";
import NotFoundPage from "pages/NotFound";
import SignInPage from "pages/SignIn";
import SignUpPage from "pages/SignUp";
import { AuthContextProvider } from "providers/authProvider";
import { CoursesContextProvider } from "providers/coursesProvider";
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

	.content-container {
		width: 60%;
		margin: 0 auto;
	}
`;

class App extends Component {
	render(): React.ReactNode {
		return (
			<AuthContextProvider>
				<BrowserRouter>
					<Navigation />
					<div className="content-container">
						<Switch>
							<Route exact path="/">
								<CoursesContextProvider>
									<HomePage />
								</CoursesContextProvider>
							</Route>
							<Route path="/signup">
								<SignUpPage />
							</Route>
							<Route path="/signin">
								<SignInPage />
							</Route>
							<Route path="*">
								<NotFoundPage />
							</Route>
						</Switch>
					</div>
				</BrowserRouter>
				<GlobalStyle />
			</AuthContextProvider>
		);
	}
}

export default App;
