import CourseList from "components/CourseList";
import { useCourses } from "providers/coursesProvider";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

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
	) : (
		<p>Загрузка...</p>
	);
};

export default CoursesPage;
