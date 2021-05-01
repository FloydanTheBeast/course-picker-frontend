import React from "react";
import { Container, Header, Text } from "./styled";

const NotFoundPage: React.FC = () => {
	return (
		<Container>
			<Header>404</Header>
			<Text>Страница не найдена</Text>
		</Container>
	);
};

export default NotFoundPage;
