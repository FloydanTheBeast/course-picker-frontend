import React from "react";
import styled from "styled-components";

interface PageControlsProps {
	currentPage: number;
	countPages: number;
	onPageChange: (pageNumber: number) => any;
	pagesToShow?: number;
}

const StyledPageControls = styled.div`
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	margin-top: 2rem;

	& span {
		margin: 0 10px;
		line-height: 30px;
	}
`;

const StyledPageButton = styled.div`
	width: 60px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	background: #000;
	color: #aaa;

	&.current-page {
		background: #ccc;
		color: #fff;
	}

	&:not(.current-page):hover {
		color: #fff;
		cursor: pointer;
	}
`;

const PageControls: React.FC<PageControlsProps> = ({
	currentPage,
	countPages,
	onPageChange,
	pagesToShow = 2
}: PageControlsProps) => {
	return (
		<StyledPageControls>
			{currentPage - pagesToShow >= pagesToShow && (
				<StyledPageButton
					className={`${currentPage === 1 ? "current-page" : ""}`}
					onClick={() => onPageChange(1)}
				>
					1
				</StyledPageButton>
			)}
			{currentPage - pagesToShow > 2 && <span>...</span>}
			{Array.from(
				new Array(
					Math.min(countPages, currentPage + pagesToShow) -
						Math.max(1, currentPage - pagesToShow) +
						1
				),
				(_, index) => Math.max(1, currentPage - pagesToShow) + index
			).map((value) => (
				<StyledPageButton
					key={value}
					className={`${currentPage === value ? "current-page" : ""}`}
					onClick={() => onPageChange(value)}
				>
					{value}
				</StyledPageButton>
			))}
			{currentPage + pagesToShow < countPages - 1 && <span>...</span>}
			{currentPage + pagesToShow < countPages && (
				<StyledPageButton
					className={`${
						currentPage === countPages ? "current-page" : ""
					}`}
					onClick={() => onPageChange(countPages)}
				>
					{countPages}
				</StyledPageButton>
			)}
		</StyledPageControls>
	);
};

export default PageControls;
