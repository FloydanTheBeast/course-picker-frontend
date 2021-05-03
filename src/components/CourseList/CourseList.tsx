import { CoursesContext } from "providers/coursesProvider";
import React from "react";
import styled from "styled-components";
import CourseCard from "./CourseCard";
import PageControls from "./PageControls";

interface CourseListState {
	currentPage: number;
	countPages: number;
	isLoading: boolean;
	courses: any[];
}

const StyledCourseList = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-auto-rows: 320px;
	grid-gap: 25px;

	@media (min-width: 1280px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1920px) {
		grid-template-columns: repeat(4, 1fr);
	}
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
