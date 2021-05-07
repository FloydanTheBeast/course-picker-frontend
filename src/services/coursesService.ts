import axios from "axios";
import AuthorizedMethod from "services/AuthorizedMethod";

export class CourseService {
	private static api = axios.create({
		baseURL: "https://api.mooc.ij.je/courses"
	});

	static getCourses(
		pageNumber = 1,
		pageSize = 1,
		searchQuery: string = null
	) {
		return this.api
			.get(
				`/?pageNumber=${pageNumber}&pageSize=${pageSize}${
					searchQuery ? `&searchQuery=${searchQuery}` : ""
				}`
			)
			.then((res) => res.data);
	}

	@AuthorizedMethod
	static getCourse(courseId: string, headers?: any) {
		return this.api
			.get(`${courseId}`, { headers })
			.then(({ data }) => data);
	}
}
