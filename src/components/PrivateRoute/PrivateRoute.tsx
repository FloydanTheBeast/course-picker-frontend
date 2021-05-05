import { AuthContext } from "providers/authProvider";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const AUTH_PATH = "/signin";

class PrivateRoute extends Route<RouteProps> {
	render() {
		return (
			<AuthContext.Consumer>
				{({ authState: { isAuthenticated } }) => {
					if (isAuthenticated) {
						return <Route {...this.props} />;
					} else {
						return (
							<Route {...this.props}>
								<Redirect to={AUTH_PATH} />
							</Route>
						);
					}
				}}
			</AuthContext.Consumer>
		);
	}
}

export default PrivateRoute;
