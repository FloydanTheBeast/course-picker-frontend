import axios from "axios";
import AuthorizedMethod from "./AuthorizedMethod";

export class ReviewsService {
	private static api = axios.create({
		baseURL: "https://api.mooc.ij.je/reviews"
	});

	public static getReviews(courseId: string) {
		return this.api.get(`/?id=${courseId}`).then((res) => res.data.reviews);
	}

	@AuthorizedMethod
	public static createReview(
		courseId: string,
		rating: number,
		text: string,
		headers?: any
	) {
		return this.api.post(`/?id=${courseId}`, { rating, text }, { headers });
	}

	@AuthorizedMethod
	public static deleteReview(reviewId: string, headers?: any) {
		return this.api.delete(`/?reviewId=${reviewId}`, { headers });
	}
}
