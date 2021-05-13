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
	categories: string;
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
	categories?: string;
}

interface Action {
	type: keyof typeof ActionTypes;
	payload?: ActionPayload;
}

const coursesReducer = (
	coursesState: State,
	{
		type,
		payload: { pageNumber, countPages, courses, searchQuery, categories }
	}: Action
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
				categories,
				courses: {
					[pageNumber]: courses
				}
			});
		}
	}
};

interface CoursesContext {
	coursesState: State;
	fetchCourses: (
		pageNumber: number,
		searchQuery?: string,
		categories?: string
	) => void;
}

const CoursesContext = createContext({} as CoursesContext);

const CoursesContextProvider: React.FC<ProviderProps> = ({
	children
}: ProviderProps) => {
	const [coursesState, dispatchCoursesState] = useReducer(coursesReducer, {
		countPages: null,
		courses: {},
		searchQuery: "",
		categories: ""
	});

	return (
		<CoursesContext.Provider
			value={{
				coursesState,
				fetchCourses: async (
					pageNumber: number,
					searchQuery = "",
					categories = ""
				): Promise<void> => {
					if (
						coursesState.searchQuery !== searchQuery ||
						coursesState.categories != categories
					) {
						const {
							courses,
							countPages
						} = await CourseService.getCourses(
							pageNumber,
							PAGE_SIZE,
							searchQuery,
							categories
						);

						dispatchCoursesState({
							type: "replaceCourses",
							payload: {
								pageNumber,
								countPages,
								courses,
								searchQuery,
								categories
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
