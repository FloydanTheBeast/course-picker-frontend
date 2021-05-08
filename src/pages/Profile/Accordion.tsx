import React, { useState } from "react";
import styled from "styled-components";

interface AccordionProps {
	title: string;
	children: React.ReactNode;
	onFirstExpansion?: () => void;
}

const AccordionContainer = styled.div`
	position: relative;
	border: 1px solid #eee;
	user-select: none;

	& .title {
		display: flex;
		align-items: center;
		background-color: #eee;
		padding: 12px 16px;
		margin: 0;
		font-size: 20px;

		&:hover {
			cursor: pointer;
		}

		&::after {
			content: "";
			position: absolute;
			right: 40px;
			width: 15px;
			height: 15px;
			border-width: 0 5px 5px 0;
			border-color: #333;
			border-style: solid;
			transform: rotateZ(135deg);
			box-sizing: border-box;
			transition: all 0.15s linear;
		}
	}

	& .content {
		padding: 12px 16px;
		display: none;
	}

	&.expanded {
		& .title {
			&::after {
				transform: rotateZ(45deg);
				margin-top: -5px;
			}
		}

		& .content {
			display: block;
		}
	}
`;

const Accordion: React.FC<AccordionProps> = ({
	title,
	children,
	onFirstExpansion
}: AccordionProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [hasExpanded, setHasExpanded] = useState(false);

	return (
		<AccordionContainer className={`${isExpanded ? "expanded" : ""}`}>
			<h2
				onClick={() => {
					if (!isExpanded && !hasExpanded) {
						onFirstExpansion();
						setHasExpanded(true);
					}
					setIsExpanded(!isExpanded);
				}}
				className="title"
			>
				{title}
			</h2>
			<div className="content">{children}</div>
		</AccordionContainer>
	);
};

export default Accordion;
