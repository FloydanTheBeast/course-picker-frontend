import { useAuth } from "providers/authProvider";
import React from "react";

const HomePage = () => {
	const {
		authState: { isAuthenticated }
	} = useAuth();

	return (
		<>
			{isAuthenticated ? (
				<>
					<h1>Добро пожаловать!</h1>
					{/* <CourseList /> */}
				</>
			) : (
				<h1>Вы не авторизованы</h1>
			)}
		</>
	);
};

export default HomePage;
