import Footer from "components/Footer";
import Navigation from "components/Navigation";
import PrivateRoute from "components/PrivateRoute";
import CoursePage from "pages/Course";
import CoursesPage from "pages/Courses";
import HomePage from "pages/Home";
import NotFoundPage from "pages/NotFound";
import ProfilePage from "pages/Profile";
import SignInPage from "pages/SignIn";
import SignUpPage from "pages/SignUp";
import { AuthContextProvider } from "providers/authProvider";
import { CoursesContextProvider } from "providers/coursesProvider";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../../fonts.css";
import GlobalStyle from "./GlobalStyle";

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
							<PrivateRoute exact path="/courses/">
								<CoursesContextProvider>
									<CoursesPage />
								</CoursesContextProvider>
							</PrivateRoute>
							<PrivateRoute
								path="/courses/:courseId"
								render={({ match }) => {
									return (
										<CoursePage
											courseId={match.params.courseId}
										/>
									);
								}}
							/>
							<PrivateRoute
								path="/profile"
								component={ProfilePage}
							/>
							<Route path="*">
								<NotFoundPage />
							</Route>
						</Switch>
					</div>
				</BrowserRouter>
				<Footer />
				<GlobalStyle />
			</AuthContextProvider>
		);
	}
}

export default App;
