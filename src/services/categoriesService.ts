import axios from "axios";

export class CategoriesService {
	private static api = axios.create({
		baseURL: "https://api.mooc.ij.je/categories"
	});

	public static getCategories() {
		return this.api.get("/").then((res) => res.data as Category[]);
	}
}
