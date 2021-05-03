import React from "react";
import {
	CoursesContextProvider,
	useCourses,
	CoursesContext
} from "providers/coursesProvider";
import CourseCard from "./CourseCard";
import styled from "styled-components";
import PageControls from "./PageControls";

interface CourseListState {
	currentPage: number;
	countPages: number;
	isLoading: boolean;
	courses: any[];
}

const StyledCourseList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 400px;
	grid-gap: 25px;
`;

class CourseList extends React.Component<any, CourseListState> {
	constructor(props: any) {
		super(props);

		this.state = {
			currentPage: 1,
			countPages: null,
			isLoading: true,
			courses: []
		};
	}

	onPageChange(pageNumber: number) {
		if (pageNumber === this.state.currentPage) {
			return;
		}

		this.setState({
			isLoading: true,
			currentPage: pageNumber
		});
	}

	render() {
		return (
			<>
				<CoursesContext.Consumer>
					{({ getCourses }) => {
						if (this.state.isLoading) {
							getCourses(this.state.currentPage).then((courses) =>
								this.setState({
									isLoading: false,
									countPages: courses.countPages,
									courses: courses.courses
								})
							);

							return <div>Загрузка...</div>;
						} else {
							return (
								<>
									<StyledCourseList>
										{this.state.courses.map(
											(course, index) => (
												<CourseCard
													key={index}
													{...course}
												/>
											)
										)}
									</StyledCourseList>
									<PageControls
										currentPage={this.state.currentPage}
										countPages={this.state.countPages}
										onPageChange={this.onPageChange.bind(
											this
										)}
									/>
								</>
							);
						}
					}}
				</CoursesContext.Consumer>
			</>
		);
	}
}

export default CourseList;
