import React, { createContext, useContext, useReducer } from "react";
import { CourseService } from "services/coursesService";

const PAGE_SIZE = 24;

interface ProviderProps {
	children: React.ReactNode;
}

interface State {
	countPages: number;
	courses: {
		[key: number]: CoursePreview[];
	};
	searchQuery: string;
}

enum ActionTypes {
	"addCourses",
	"replaceCourses"
}

interface ActionPayload {
	countPages: number;
	pageNumber: number;
	courses: CoursePreview[];
	searchQuery?: string;
}

interface Action {
	type: keyof typeof ActionTypes;
	payload?: ActionPayload;
}

const coursesReducer = (
	coursesState: State,
	{ type, payload: { pageNumber, countPages, courses, searchQuery } }: Action
): State => {
	switch (type) {
		case "addCourses": {
			const newCourses = Object.assign({}, coursesState.courses, {
				[pageNumber]: courses
			});

			return Object.assign({}, coursesState, {
				countPages,
				courses: newCourses
			});
		}
		case "replaceCourses": {
			return Object.assign({}, coursesState, {
				countPages,
				searchQuery,
				courses: {
					[pageNumber]: courses
				}
			});
		}
	}
};

interface CoursesContext {
	coursesState: State;
	fetchCourses: (pageNumber: number, searchQuery?: string) => void;
}

const CoursesContext = createContext({} as CoursesContext);

const CoursesContextProvider: React.FC<ProviderProps> = ({
	children
}: ProviderProps) => {
	const [coursesState, dispatchCoursesState] = useReducer(coursesReducer, {
		countPages: null,
		courses: {},
		searchQuery: ""
	});

	return (
		<CoursesContext.Provider
			value={{
				coursesState,
				fetchCourses: async (
					pageNumber: number,
					searchQuery = ""
				): Promise<void> => {
					if (coursesState.searchQuery !== searchQuery) {
						const {
							courses,
							countPages
						} = await CourseService.getCourses(
							pageNumber,
							PAGE_SIZE,
							searchQuery
						);

						dispatchCoursesState({
							type: "replaceCourses",
							payload: {
								pageNumber,
								countPages,
								courses,
								searchQuery
							}
						});

						return;
					}

					if (pageNumber in coursesState.courses) {
						return;
					}

					const {
						courses,
						countPages
					} = await CourseService.getCourses(
						pageNumber,
						PAGE_SIZE,
						searchQuery
					);

					dispatchCoursesState({
						type: "addCourses",
						payload: {
							pageNumber,
							countPages,
							courses,
							searchQuery
						}
					});
				}
			}}
		>
			{children}
		</CoursesContext.Provider>
	);
};

const useCourses = () => useContext(CoursesContext);

export { CoursesContextProvider, CoursesContext, useCourses };
