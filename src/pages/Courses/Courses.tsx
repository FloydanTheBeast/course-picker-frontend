import CourseList from "components/CourseList";
import Loader from "components/Loader";
import { useCourses } from "providers/coursesProvider";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledLoader = styled(Loader)`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

const CoursesPage: React.FC = () => {
	document.title = "MOOC · Поиск по курсам";

	const { search } = useLocation();
	const history = useHistory();

	const queryParams = new URLSearchParams(search);

	const searchQuery = queryParams.get("search") || "";
	const categories = queryParams.get("categories") || "";
	const currentPage = Number(queryParams.get("page")) || 1;

	const { fetchCourses, coursesState } = useCourses();

	useEffect(() => fetchCourses(currentPage, searchQuery, categories), [
		currentPage,
		searchQuery,
		fetchCourses,
		categories
	]);

	return currentPage in coursesState.courses ? (
		<>
			<CourseList
				courses={coursesState.courses[currentPage]}
				countPages={coursesState.countPages}
				currentPage={currentPage}
				onPageChange={(pageNumber) =>
					history.push(
						`/courses/?search=${searchQuery}&page=${pageNumber}`
					)
				}
			/>
		</>
	) : (
		<StyledLoader />
	);
};

export default CoursesPage;
