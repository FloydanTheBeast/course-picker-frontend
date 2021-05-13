declare module "react-star-ratings" {
	const value: React.FC<{
		rating?: number;
		numberOfStars?: number;
		starDimension?: string;
		starSpacing?: string;
		starRatedColor?: string;
		changeRating?: (rating: number) => void;
		starHoverColor?: string;
	}>;
	export default value;
}
