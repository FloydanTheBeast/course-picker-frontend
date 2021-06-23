import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.footer`
	display: flex;
	flex-flow: row wrap;
	list-style: none;
	justify-content: space-between;
	align-items: center;
	padding: 10px 30px;
	background: #ffd7ba;
	font-size: 14px;

	& > * {
		margin: 8px;
	}

	& > a {
		transition: color 0.2s;

		&:hover {
			color: #71b7e6;
		}
	}

	& > p {
		display: inline-block;

		& > span {
			font-weight: bold;
		}
	}
`;

const Footer: React.FC = () => {
	return (
		<StyledFooter>
			<Link to="/">Главная страница</Link>
			<a
				href="https://api.mooc.ij.je/api-docs/"
				rel="noreferrer"
				target="_blank"
			>
				Публичное API
			</a>
			<p>
				<span>Платформа MOOC для агрегации курсов</span>
				<br /> Проект выполнен в качестве курсовго проекта для НИУ ВШЭ
			</p>
		</StyledFooter>
	);
};

export default Footer;
