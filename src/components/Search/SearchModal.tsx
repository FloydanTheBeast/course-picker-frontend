import { useCourses } from "providers/coursesProvider";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Link, useHistory } from "react-router-dom";
import StarRating from "react-star-ratings";
import styled from "styled-components";

interface SearchModalProps {
	modalRoot: HTMLElement;
	onClose: () => void;
}

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.9);
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;

	& > div {
		width: 60%;
		min-width: 300px;
		display: flex;
		flex-flow: column nowrap;
	}
`;

const SearchInput = styled.input`
	border: 4px solid #ccc;
	background: rgba(0, 0, 0, 0.3);
	color: #fff;
	padding: 12px;
`;

const CoursePreviewList = styled.div`
	display: flex;
	flex-flow: column;
	color: #fff;

	& .course-preview {
		display: flex;
		flex-flow: row nowrap;
		background: #fff;
		padding: 12px 10px;
		align-items: center;
		border-bottom: 1px solid #ccc;

		& .star-ratings {
			flex-shrink: 0;
			margin-right: 10px;
		}

		& p {
			font-size: 14px;
			margin: 0;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			display: -webkit-box;
		}
	}
`;

const SearchModal: React.FC<SearchModalProps> = ({
	modalRoot,
	onClose
}: SearchModalProps) => {
	const history = useHistory();
	const modalContentRef = useRef(null);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const {
		fetchCourses,
		coursesState: { courses, searchQuery }
	} = useCourses();
	const updatePreviewDelay = 750;

	useEffect(() => {
		searchInputRef.current.value = searchQuery;
		document.body.appendChild(modalRoot);
		document.body.style.overflow = "hidden";
		window.addEventListener("click", handleOutsideClick);
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			clearTimeout(updatePreviewTimer);
			document.body.removeChild(modalRoot);
			document.body.style.overflow = "";
			window.removeEventListener("click", handleOutsideClick);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const handleOutsideClick = (event: MouseEvent) => {
		if (!modalContentRef.current.contains(event.target)) {
			onClose();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			onClose();
		}
	};

	const handleEnterKeyDown = (
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === "Enter") {
			performSearch(event.currentTarget.value);
		}
	};

	const performSearch = (searchQuery: string) => {
		history.push(`/courses?search=${searchQuery}`);
		onClose();
	};

	const updatePreview = () => fetchCourses(1, searchInputRef.current.value);

	let updatePreviewTimer: NodeJS.Timeout;

	return ReactDOM.createPortal(
		<ModalContainer>
			<div ref={modalContentRef}>
				<SearchInput
					ref={searchInputRef}
					onInput={() => {
						clearTimeout(updatePreviewTimer);
						updatePreviewTimer = setTimeout(
							updatePreview,
							updatePreviewDelay
						);
					}}
					onKeyDown={handleEnterKeyDown}
					placeholder="Введите запрос"
				/>
			</div>
			<CoursePreviewList>
				{1 in courses &&
					courses[1].slice(0, 10).map((course, index) => {
						return (
							<Link
								to={`/courses/${course.id}`}
								className="course-preview"
								key={index}
							>
								<StarRating
									rating={
										course.rating.external.averageScore | 0
									}
									starDimension="16px"
									starSpacing="1px"
									starRatedColor="#f39c12"
								/>
								<p className="course-preview_name">
									{course.courseName}
								</p>
							</Link>
						);
					})}
			</CoursePreviewList>
		</ModalContainer>,
		modalRoot
	);
};

export default SearchModal;
