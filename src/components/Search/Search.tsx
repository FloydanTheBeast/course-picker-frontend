import SearchIcon from "icons/search.svg";
import { CoursesContextProvider } from "providers/coursesProvider";
import React, { useState } from "react";
import SearchModal from "./SearchModal";

const Search = () => {
	const [modalShown, setModalShown] = useState(false);
	const modalRoot = document.createElement("div");

	return (
		<>
			<SearchIcon onClick={() => setModalShown(true)} />
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
