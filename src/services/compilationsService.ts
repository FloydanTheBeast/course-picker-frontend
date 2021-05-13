import axios from "axios";

export class ComplilationsService {
	private static api = axios.create({
		baseURL: "https://api.mooc.ij.je/compilations"
	});

	public static getCompilations() {
		return this.api.get("/").then((res) => res.data);
	}
}
