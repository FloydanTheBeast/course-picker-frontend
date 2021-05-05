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
	categories: {
		id: number;
		name: {
			[key: string]: string;
		};
	}[];
	countViews: number;
}

declare interface CourseInfo {
	course: CoursePreview;
	isFavourite: boolean;
	isViewed: boolean;
}
