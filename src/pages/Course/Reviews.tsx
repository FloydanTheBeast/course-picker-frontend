import Button from "components/Button";
import MessageBox from "components/MessageBox";
import DeleteIcon from "icons/delete.svg";
import { useAuth } from "providers/authProvider";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "react-star-ratings";
import { ReviewsService } from "services/reviewsService";
import styled from "styled-components";

interface ReviewProps {
	review: Review;
	onDelete?: (reviewId: string) => void;
}

interface ReviewsProps {
	courseId: string;
	reviews: Review[];
	onUpdate: () => void;
}

const ReviewContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;
	background: #fff;
	padding: 20px;
	box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);

	&:not(:last-child) {
		margin-bottom: 20px;
	}

	& .review {
		&_date {
			margin: 0;
			font-size: 16px;
		}

		&_header {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;

			&__own-review {
				margin-bottom: 20px;
			}
		}

		&_username {
			margin: 12px 0;
			font-size: 16px;

			& span {
				color: #333;
			}
		}

		&_text {
			font-size: 14px;
			color: #555;
		}

		&_edit-area {
			width: 100%;
			box-sizing: border-box;
			margin: 16px 0;
			resize: none;
			border: 1px solid #ddd;
			border-radius: 8px;
			padding: 8px;
			color: #555;
		}

		&_save-btn {
			display: block;
			margin: 0 auto;
		}

		&_delete-icon {
			width: 20px;
			height: 20px;
			padding: 10px;
			overflow: visible;
			border-radius: 50%;
			background-color: #555;
			fill: #fff;
			transition: background-color 0.2s;

			&:hover {
				cursor: pointer;
				background-color: #e74c3c;
			}
		}
	}
`;

const Review: React.FC<ReviewProps> = ({ review, onDelete }: ReviewProps) => {
	const ownComment = typeof onDelete === "function";

	return (
		<>
			{ownComment && (
				<div className="review_header review_header__own-review">
					<h2>Ваш комментарий</h2>
					<DeleteIcon
						className="review_delete-icon"
						onClick={() => onDelete(review.id)}
					/>
				</div>
			)}
			<div className="review_header">
				<StarRating
					rating={review.rating}
					starDimension="24px"
					starSpacing="2px"
					starRatedColor="#f39c12"
				/>
				<p className="review_date">
					{new Date(review.creationDate).toLocaleDateString()}
				</p>
			</div>
			{!ownComment && (
				<p className="review_username">
					Оставил пользователь <span>{review.user.username}</span>
				</p>
			)}
			<p className="review_text">{review.text}</p>
		</>
	);
};

const Reviews: React.FC<ReviewsProps> = ({
	courseId,
	reviews,
	onUpdate
}: ReviewsProps) => {
	const {
		authState: { user: currentUser }
	} = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	reviews = reviews.sort((review1, review2) =>
		review1.user.username === currentUser.username
			? -1
			: review2.user.username === currentUser.username
			? 1
			: 0
	);

	const hasCommented = reviews.some(
		(review) => review.user.username === currentUser.username
	);
	const [userRating, setUserRating] = useState(1);

	const onSubmitReview = ({ reviewText }: any) => {
		ReviewsService.createReview(courseId, userRating, reviewText).then(() =>
			onUpdate()
		);
	};

	const onReviewDelete = (reviewId: string) => {
		ReviewsService.deleteReview(reviewId).then(() => onUpdate());
	};

	return (
		<>
			{!hasCommented && (
				<ReviewContainer>
					<form onSubmit={handleSubmit(onSubmitReview)}>
						<StarRating
							rating={userRating}
							starDimension="24px"
							starSpacing="2px"
							starRatedColor="#f39c12"
							changeRating={(rating) => setUserRating(rating)}
							starHoverColor="#f1c40f"
						/>
						{errors.reviewText && (
							<MessageBox
								type="error"
								message={errors.reviewText.message}
							/>
						)}
						<textarea
							{...register("reviewText", {
								required: {
									value: true,
									message: "Пожалуйста, оставьте комментарий"
								}
							})}
							className="review_edit-area"
							placeholder="Оставьте свой комментарий..."
							rows={6}
						></textarea>
						<Button type="submit" className="review_save-btn">
							Оставить отзыв
						</Button>
					</form>
				</ReviewContainer>
			)}
			{reviews.map((review) => (
				<ReviewContainer key={review.id}>
					<Review
						review={review}
						onDelete={
							review.user.username === currentUser.username
								? onReviewDelete
								: null
						}
					/>
				</ReviewContainer>
			))}
		</>
	);
};

export default Reviews;
