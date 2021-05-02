import React from "react";
import {
	CoursesContextProvider,
	useCourses,
	CoursesContext
} from "providers/coursesProvider";
import CourseCard from "./CourseCard";
import styled from "styled-components";

interface CourseListState {
	currentPage: number;
	isLoading: boolean;
	courses: any[];
}

const StyledCourseList = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
`;

class CourseList extends React.Component<any, CourseListState> {
	constructor(props: any) {
		super(props);

		this.state = {
			currentPage: 1,
			isLoading: true,
			courses: []
		};
	}

	render() {
		return (
			<StyledCourseList>
				<CoursesContext.Consumer>
					{(value) => {
						if (this.state.isLoading) {
							value
								.getCourses(this.state.currentPage)
								.then((courses) =>
									this.setState({ isLoading: false, courses })
								);

							return <div>Загрузка...</div>;
						} else {
							return this.state.courses.map((course, index) => (
								<CourseCard key={index} {...course} />
							));
						}
					}}
				</CoursesContext.Consumer>
			</StyledCourseList>
		);
	}
}

export default CourseList;
