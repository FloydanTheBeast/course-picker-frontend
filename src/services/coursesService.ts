import axios from "axios";

export class CourseService {
	private static api = axios.create({
		baseURL: "https://api.mooc.ij.je/courses"
	});

	static getCourses(pageNumber = 1, pageSize = 1) {
		return this.api.get(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
	}
}
