declare interface CoursePreview {
	courseName: string;
	shortDescription: string;
	description: string;
	duration: string;
	id: string;
	link: string;
	previewImageLink: string;
	price: {
		amount: number;
		currency: string;
	};
	rating: {
		external: {
			averageScore: number | null;
			countReviews: number;
		};
		internal: {
			averageScore: number | null;
			countReviews: number;
		};
	};
	reviews: Review[];
	courseLanguages: string[];
	author: {
		icon: string;
		link: string;
		name: string;
	};
	vendor: {
		id: string;
		name: string;
		link: string;
		icon: string;
	};
	categories: Category[];
	countViews: number;
}

declare interface CourseInfo {
	course: CoursePreview;
	isFavourite: boolean;
	isViewed: boolean;
}

declare interface Review {
	rating: number;
	text: string;
	creationDate: string;
	user: {
		username: string;
	};
	id: string;
}

declare interface UserData {
	email: string;
	username: string;
}

declare interface Category {
	id: number;
	name: {
		[key: string]: string;
	};
}
