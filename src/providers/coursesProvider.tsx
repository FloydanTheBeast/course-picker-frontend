import { AxiosResponse } from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { CourseService } from "services/coursesService";

const PAGE_SIZE = 30;

interface ProviderProps {
	children: React.ReactNode;
}

interface State {
	countPages: number;
	courses: {
		[key: number]: unknown[];
	};
}

enum ActionTypes {
	"addCourses"
}

interface ActionPayload {
	pageNumber: number;
	// FIXME: Задать интерфейс курса
	courses: unknown[];
}

interface Action {
	type: keyof typeof ActionTypes;
	payload?: ActionPayload;
}

const coursesReducer = (
	coursesState: State,
	{ type, payload: { pageNumber, courses } }: Action
): State => {
	switch (type) {
		case "addCourses": {
			const newCourses = Object.assign({}, coursesState.courses, {
				[pageNumber]: courses
			});

			return Object.assign(coursesState, {
				courses: newCourses
			});
		}
	}
};

interface CoursesContext {
	getCourses: (pageNumber: number) => Promise<unknown[]>;
}

const CoursesContext = createContext({} as CoursesContext);

const CoursesContextProvider: React.FC<ProviderProps> = ({
	children
}: ProviderProps) => {
	const [coursesState, dispatchCoursesState] = useReducer(coursesReducer, {
		countPages: null,
		courses: {}
	});

	return (
		<CoursesContext.Provider
			value={{
				getCourses: async (pageNumber: number) => {
					if (pageNumber in coursesState.courses) {
						return coursesState.courses[pageNumber];
					}

					const {
						data: fetchedCourses
					} = await CourseService.getCourses(pageNumber, PAGE_SIZE);

					dispatchCoursesState({
						type: "addCourses",
						payload: {
							pageNumber,
							courses: fetchedCourses.courses
						}
					});

					return coursesState.courses[pageNumber];
				}
			}}
		>
			{children}
		</CoursesContext.Provider>
	);
};

const useCourses = () => useContext(CoursesContext);

export { CoursesContextProvider, CoursesContext, useCourses };
