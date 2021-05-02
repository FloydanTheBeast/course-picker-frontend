import React from "react";
import styled from "styled-components";

interface CourseCardProps {
	courseName: string;
	shortDescription: string;
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
			averageScore: number;
			countReviews: number;
		};
		internal: {
			averageScore: number;
			countReviews: number;
		};
	};
	courseLanguages: string[];
	author: {
		icon: string;
		link: string;
		name: string;
	};
	categories: {
		id: number;
		name: {
			[key: string]: string;
		};
	}[];
	countViews: number;
}

const StyledCourseCard = styled.div`
	height: 300px;
	width: 45%;
	margin: 10px 0;
	padding: 10px;
	border: 0.5px solid #aaa;
	border-radius: 8px;
	overflow: hidden;

	&:hover {
		cursor: pointer;
	}
`;

const StyledCourseCardHeader = styled.div``;

const StyledCouseCardBody = styled.div``;

const CourseCard: React.FC<CourseCardProps> = (props: CourseCardProps) => {
	return (
		<StyledCourseCard>
			<StyledCourseCardHeader>
				<h2>{props.courseName}</h2>
			</StyledCourseCardHeader>
			<StyledCouseCardBody>{props.shortDescription}</StyledCouseCardBody>
		</StyledCourseCard>
	);
};

export default CourseCard;
