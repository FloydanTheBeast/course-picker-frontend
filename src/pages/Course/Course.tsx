import ViewIcon from "icons/eye.svg";
import LikeIcon from "icons/heart.svg";
import NotFoundPage from "pages/NotFound";
import React from "react";
import StarRating from "react-star-ratings";
import { CourseService } from "services/coursesService";
import { ReviewsService } from "services/reviewsService";
import { UsersService } from "services/usersService";
import Reviews from "./Reviews";
import {
	Categories,
	Category,
	CourseBlock,
	CourseBody,
	CourseContainer,
	CourseHeader,
	CourseStatusBlock,
	CourseSubblock,
	LinkImage,
	Property
} from "./styled";

interface CoursePageProps {
	courseId: string;
}

type CoursePageState = {
	isFound: boolean;
	isLoading: boolean;
	isViewed: boolean;
	isFavourite: boolean;
	course: CoursePreview;
};

const currencyMapping: { [key: string]: string } = {
	RUB: "₽",
	USD: "$"
};

class CoursePage extends React.Component<CoursePageProps, CoursePageState> {
	constructor(props: CoursePageProps) {
		super(props);

		document.title = "MOOC · Загрузка курса";

		this.state = {
			isFound: true,
			isLoading: true,
			isViewed: false,
			isFavourite: false,
			course: null
		};

		CourseService.getCourse(props.courseId)
			.then((data) => {
				document.title = `MOOC · Курс "${data.course.courseName}"`;
				this.setState({
					isLoading: false,
					isViewed: data.isViewed,
					isFavourite: data.isFavourite,
					course: data.course
				});
			})
			.catch(() => {
				this.setState({
					isFound: false
				});
			});
	}

	toggleLike() {
		UsersService.toggleFavourite(
			this.state.course.id,
			!this.state.isFavourite
		)
			.then(() =>
				this.setState((prevState) => {
					return {
						isFavourite: !prevState.isFavourite
					};
				})
			)
			.catch(/* TODO: Отображать ошибку */);
	}

	toggleView() {
		UsersService.toggleViewed(this.state.course.id, !this.state.isViewed)
			.then(() =>
				this.setState((prevState) => {
					return {
						isViewed: !prevState.isViewed
					};
				})
			)
			.catch(/* TODO: Отображать ошибку */);
	}

	onReviewsUpdate() {
		ReviewsService.getReviews(this.state.course.id).then((reviews) =>
			this.setState((prevState) => {
				const newState = Object.assign({}, prevState);
				newState.course.reviews = reviews;
				return newState;
			})
		);
	}

	render() {
		const { course } = this.state;

		if (!this.state.isFound) {
			return <NotFoundPage />;
		}

		return (
			<CourseContainer>
				{this.state.isLoading ? (
					"Загрузка..."
				) : (
					<>
						<CourseHeader
							previewImageLink={course.previewImageLink}
						>
							<h1>{course.courseName}</h1>
							<div className="header_darken"></div>
						</CourseHeader>
						<CourseBody>
							<CourseBlock horizontal>
								<CourseSubblock>
									<Property>
										<h2>Цена:</h2>
										<span>
											{course.price.amount === 0
												? "Бесплатно"
												: `${course.price.amount} ${
														currencyMapping[
															course.price
																.currency
														] ||
														course.price.currency
												  }`}
										</span>
									</Property>
									<Property>
										<h2>Язык:</h2>
										{course.courseLanguages.map(
											(language, index) => (
												<span key={index}>
													{language.toUpperCase()}
												</span>
											)
										)}
									</Property>
								</CourseSubblock>
								<CourseStatusBlock>
									<LikeIcon
										className={`like ${
											this.state.isFavourite
												? "active"
												: ""
										}`}
										onClick={this.toggleLike.bind(this)}
									/>
									<ViewIcon
										className={`view ${
											this.state.isViewed ? "active" : ""
										}`}
										onClick={this.toggleView.bind(this)}
									/>
								</CourseStatusBlock>
							</CourseBlock>
							<CourseBlock>
								<h2>Категории</h2>
								<Categories>
									{course.categories.map((category) => (
										<Category key={category.id}>
											{category.name["ru"]}
										</Category>
									))}
								</Categories>
							</CourseBlock>
							<hr />
							<CourseBlock horizontal>
								<CourseSubblock>
									<h2>Платформа</h2>
									<LinkImage>
										<img
											src={course.vendor.icon}
											alt={`Логотип ${course.vendor.name}`}
										/>
										<a
											target="_blank"
											rel="noreferrer"
											href={course.vendor.link}
										>
											{course.vendor.name}
										</a>
									</LinkImage>
								</CourseSubblock>
								<CourseSubblock alignRight>
									<h2>Автор</h2>
									<LinkImage>
										{course.author.icon && (
											<img
												src={course.author.icon}
												alt={`Картинка автора ${course.author.name}`}
											/>
										)}
										<a
											target="_blank"
											rel="noreferrer"
											href={course.author.link}
										>
											{course.author.name}
										</a>
									</LinkImage>
								</CourseSubblock>
							</CourseBlock>
							<hr />
							<h2>Рейтинг</h2>
							<CourseBlock horizontal>
								<CourseSubblock>
									<p>Рейтинг {course.vendor.name}</p>
									<StarRating
										rating={
											course.rating.external
												.averageScore || 0
										}
										starDimension="24px"
										starSpacing="2px"
										starRatedColor="#f39c12"
									/>
								</CourseSubblock>
								<CourseSubblock alignRight>
									<p>Внутренний рейтинг</p>
									<StarRating
										rating={
											course.rating.internal
												.averageScore || 0
										}
										starDimension="24px"
										starSpacing="2px"
										starRatedColor="#f39c12"
									/>
								</CourseSubblock>
							</CourseBlock>
							<hr />
							<CourseBlock>
								<h2>Описание</h2>
								<p>{course.description}</p>
							</CourseBlock>
							<hr />
							<CourseBlock>
								<h2>Отзывы</h2>
								<Reviews
									courseId={course.id}
									reviews={course.reviews}
									onUpdate={this.onReviewsUpdate.bind(this)}
								/>
							</CourseBlock>
						</CourseBody>
					</>
				)}
			</CourseContainer>
		);
	}
}

export default CoursePage;
