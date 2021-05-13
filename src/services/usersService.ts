import axios from "axios";
import AuthorizedMethod from "./AuthorizedMethod";

export class UsersService {
	private static api = axios.create({
		baseURL: "https://api.mooc.ij.je/users"
	});

	@AuthorizedMethod
	public static toggleFavourite(
		courseId: string,
		isLiked: boolean,
		headers?: any
	) {
		if (isLiked) {
			return this.api.post(`/favourite?id=${courseId}`, null, {
				headers
			});
		}

		return this.api.delete(`/favourite?id=${courseId}`, { headers });
	}

	@AuthorizedMethod
	public static getFavourite(headers?: any) {
		return this.api
			.get("/favourite", { headers })
			.then((res) => res.data["favouriteCourses"]);
	}

	@AuthorizedMethod
	public static toggleViewed(
		courseId: string,
		isViewed: boolean,
		headers?: any
	) {
		if (isViewed) {
			return this.api.post(`/viewed?id=${courseId}`, null, {
				headers
			});
		}

		return this.api.delete(`/viewed?id=${courseId}`, { headers });
	}

	@AuthorizedMethod
	public static getViewed(headers?: any) {
		return this.api
			.get("/viewed", { headers })
			.then((res) => res.data["viewedCourses"]);
	}
}
