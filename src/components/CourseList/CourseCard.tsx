import React from "react";
import { generatePath, Link } from "react-router-dom";
import StarRating from "react-star-ratings";
import styled from "styled-components";

type CourseCardProps = CoursePreview;

const StyledCourseCard = styled.div`
	height: 100%;
	box-sizing: border-box;
	border: 0.5px solid #aaa;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.25);
	transition: all 0.2s ease-in-out;

	&:hover {
		cursor: pointer;
		transform: scale(1.05);
		box-shadow: 2px 2px 5px 4px rgba(0, 0, 0, 0.4);
	}
`;

const StyledCourseCardHeader = styled.div<{ previewImageLink: string }>`
	background-image: url(${(props) => props.previewImageLink});
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	height: 160px;

	& .header {
		&_vendor {
			position: relative;
			top: 10px;
			left: 10px;
			display: flex;
			align-items: center;

			& p {
				color: #fff;
				margin: 0 0 0 4px;
			}
		}

		&_darken {
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.8);
		}
	}

	& h2 {
		color: #fff;
		font-size: 24px;
		position: absolute;
		bottom: 15px;
		left: 15px;
		right: 15px;
		margin: 0;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		display: -webkit-box;
	}
`;

const StyledCouseCardBody = styled.div`
	padding: 15px;

	.row {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}

	.price {
		font-size: 20px;
		margin: 0;
		color: #666;
	}

	& p {
		color: #666;
		line-height: 18px;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
		display: -webkit-box;
	}
`;

const currencyMapping: { [key: string]: string } = {
	RUB: "₽",
	USD: "$"
};

const CourseCard: React.FC<CourseCardProps> = (props: CourseCardProps) => {
	return (
		<Link to={generatePath("/courses/:courseId", { courseId: props.id })}>
			<StyledCourseCard>
				<StyledCourseCardHeader
					previewImageLink={props.previewImageLink}
				>
					<div className="header_darken">
						<div className="header_vendor">
							<img
								src={props.vendor.icon}
								alt={`Логотип ${props.vendor.name}`}
							/>
							<p>{props.vendor.name}</p>
						</div>
					</div>
					<h2>{props.courseName}</h2>
				</StyledCourseCardHeader>
				<StyledCouseCardBody>
					<div className="row">
						<StarRating
							rating={props.rating.external.averageScore || 0}
							starDimension="20px"
							starSpacing="2px"
							starRatedColor="#f39c12"
						/>
						<span className="price">
							{props.price.amount === 0 ? (
								"Бесплатно"
							) : (
								<>
									{props.price.amount}
									{currencyMapping[props.price.currency] ||
										props.price.currency}
								</>
							)}
						</span>
					</div>
					<p>{props.shortDescription}</p>
				</StyledCouseCardBody>
			</StyledCourseCard>
		</Link>
	);
};

export default CourseCard;
