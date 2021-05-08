import SearchIcon from "icons/search.svg";
import { CoursesContextProvider } from "providers/coursesProvider";
import React, { useState } from "react";
import styled from "styled-components";
import SearchModal from "./SearchModal";

const StyledSearchIcon = styled(SearchIcon)`
	box-sizing: border-box;
	padding: 6px;
	overflow: visible;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: 1.5px solid #888;
	fill: #888;
	transition: all 0.2s;

	&:hover {
		border-color: #fff;
		fill: #fff;
		cursor: pointer;
	}
`;

const Search = () => {
	const [modalShown, setModalShown] = useState(false);
	const modalRoot = document.createElement("div");

	return (
		<>
			<StyledSearchIcon onClick={() => setModalShown(true)} />
			<CoursesContextProvider>
				{modalShown && (
					<SearchModal
						modalRoot={modalRoot}
						onClose={() => setModalShown(false)}
					/>
				)}
			</CoursesContextProvider>
		</>
	);
};

export default Search;
