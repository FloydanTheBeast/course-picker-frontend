import React from "react";
import styled from "styled-components";
import CourseCard from "./CourseCard";
import PageControls from "./PageControls";

interface CourseListProps {
	courses: CoursePreview[];
	currentPage?: number;
	onPageChange?: (pageNumber: number) => void;
	countPages?: number;
}

const StyledCourseList = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-auto-rows: 320px;
	grid-gap: 25px;

	@media (min-width: 560px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	@media (min-width: 1280px) {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	@media (min-width: 1920px) {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
`;

const CourseList: React.FC<CourseListProps> = (props: CourseListProps) => {
	return (
		<>
			<StyledCourseList>
				{props.courses.map((course, index) => (
					<CourseCard key={index} {...course} />
				))}
			</StyledCourseList>
			{props.currentPage && (
				<PageControls
					currentPage={props.currentPage}
					countPages={props.countPages}
					onPageChange={props.onPageChange}
				/>
			)}
		</>
	);
};

export default CourseList;
