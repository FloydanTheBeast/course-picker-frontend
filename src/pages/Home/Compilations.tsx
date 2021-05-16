import axios from "axios";
import CourseList from "components/CourseList";
import Loader from "components/Loader";
import React from "react";
import { ComplilationsService } from "services/compilationsService";
import styled from "styled-components";

interface CompilationsState {
	compilations: {
		link: string;
		name: {
			[key: string]: string;
		};
		icon: string;
		courses: CoursePreview[] | null;
	}[];
	selectedCompilation: number;
}

const StyledLoader = styled(Loader)`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

const CompilationList = styled.div`
	display: flex;
	flex-flow: row nowrap;
	margin-bottom: 20px;
	overflow-x: auto;
	padding: 10px 0;
`;

const CompilationButton = styled.div<{ icon: string }>`
	min-width: 60px;
	min-height: 60px;
	background: ${(props) => `url(${props.icon})`} no-repeat center center;
	background-size: 95%;
	border: 4px solid #eee;
	border-radius: 50%;
	margin-right: 20px;
	transition: all 0.3s;

	&:hover {
		cursor: pointer;
		border-color: #aaa;
	}

	&.active {
		border-color: #555;
	}
`;

class Compilations extends React.Component<any, CompilationsState> {
	constructor(props: never) {
		super(props);

		this.state = {
			compilations: [],
			selectedCompilation: null
		};
	}

	componentDidMount() {
		ComplilationsService.getCompilations().then((compilations) => {
			this.setState({
				compilations: compilations.map((compilation: any): any => {
					return {
						link: compilation.link,
						name: compilation.name,
						icon: compilation.icon,
						courses: null
					};
				})
			});
		});
	}

	selectCompilation(index: number) {
		this.setState({
			selectedCompilation: index
		});

		if (!this.state.compilations[index].courses) {
			axios
				.get(this.state.compilations[index].link)
				.then(({ data: { courses } }) =>
					this.setState((state) => {
						const newState = Object.assign({}, state);
						newState.compilations[index].courses = courses;
						return newState;
					})
				);
		}
	}

	render() {
		const courses =
			this.state.compilations[this.state.selectedCompilation]?.courses ||
			[];

		return (
			<>
				<h2>Доступные подборки</h2>
				<CompilationList>
					{this.state.compilations.map((compilation, index) => {
						return (
							<CompilationButton
								className={`${
									this.state.selectedCompilation === index
										? "active"
										: ""
								}`}
								key={`compilation-${index}`}
								icon={compilation.icon}
								title={compilation.name["ru"]}
								onClick={() => this.selectCompilation(index)}
							/>
						);
					})}
				</CompilationList>
				{courses.length ? (
					<CourseList courses={courses} />
				) : (
					this.state.selectedCompilation !== null && <StyledLoader />
				)}
			</>
		);
	}
}

export default Compilations;
