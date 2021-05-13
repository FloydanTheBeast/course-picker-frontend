import Loader from "components/Loader";
import FiltersIcon from "icons/filters.svg";
import SearchIcon from "icons/search.svg";
import { useCourses } from "providers/coursesProvider";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useHistory } from "react-router-dom";
import StarRating from "react-star-ratings";
import { CategoriesService } from "services/categoriesService";
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
	background-color: rgba(0, 0, 0, 0.92);
	animation: modal-appear 0.2s ease-out 1;
	overflow-y: auto;

	@keyframes modal-appear {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
`;

const ContentContainer = styled.div`
	width: 60%;
	min-width: 300px;
	margin: 150px auto 50px;
	display: flex;
	flex-flow: column wrap;
`;

const SearchRow = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row nowrap;

	& > :not(:last-child) {
		border-right: none !important;
	}

	& .search-button {
		width: 50px;
		box-sizing: border-box;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4);
		border: 2px solid #eee;
		transition: all 0.2s;

		&.active {
			background-color: #eee;

			& svg {
				fill: #333;
			}

			&:hover {
				& svg {
					fill: #aaa;
				}
			}
		}

		& svg {
			transition: all 0.2s;
			fill: #eee;
		}

		&:hover {
			cursor: pointer;
			background: #eee;

			& svg {
				fill: #333;
			}
		}
	}
`;

const FiltersContainer = styled.div`
	overflow: hidden;
	max-height: 0;

	& h2 {
		color: #eee;
		margin: 0 0 10px 0;
	}

	&.visible {
		animation: filters-appear 1s ease-in 1;
		max-height: 500px;
		margin: 10px 0;
	}

	& .categories {
		display: flex;
		flex-flow: row wrap;
	}

	@keyframes filters-appear {
		from {
			max-height: 0;
		}

		to {
			max-height: 500px;
		}
	}
`;

const Category = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	border: 2px solid #aaa;
	padding: 5px 10px;
	border-radius: 16px;
	color: #aaa;
	margin: 0 10px 10px 0;
	transition: all 0.2s;
	user-select: none;

	&.active {
		background-color: #eee;
		border-color: #eee;
		color: #333;
	}

	&:hover {
		cursor: pointer;
		border-color: #eee;
	}
`;

const SearchInput = styled.input`
	border: 2px solid #eee;
	background: rgba(0, 0, 0, 0.4);
	color: #fff;
	padding: 12px;
	flex-grow: 1;
`;

const CoursePreviewList = styled.div`
	position: relative;
	display: flex;
	flex-flow: column;
	color: #fff;
	width: 100%;

	& .loader {
		position: absolute;
		top: 100px;
		left: 50%;
		transform: translateX(-50%);
		width: 30px;
		height: 30px;
	}

	& .course-preview {
		display: flex;
		flex-flow: row nowrap;
		background-color: rgba(0, 0, 0, 0.15);
		padding: 16px 10px;
		align-items: center;
		border-bottom: 1px solid #555;
		transition: all 0.2s;

		&:hover {
			cursor: pointer;
			background-color: rgba(0, 0, 0, 0.9);
			border-color: #eee;
		}

		& .star-ratings {
			flex-shrink: 0;
			margin-right: 10px;
		}

		& p {
			color: #eee;
			font-size: 14px;
			margin: 0;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
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

	const [filtersVisible, setFiltersVisible] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		CategoriesService.getCategories().then((categories) =>
			setCategories(categories)
		);

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

	const toggleCategory = (categoryId: number) => {
		if (selectedCategories.includes(categoryId)) {
			setSelectedCategories(
				selectedCategories.filter((category) => category != categoryId)
			);
		} else {
			setSelectedCategories([...selectedCategories, categoryId]);
		}
	};

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
			performSearch();
		}
	};

	const performSearch = () => {
		const searchQuery = searchInputRef?.current.value || "";
		if (searchQuery || selectedCategories.length) {
			history.push(`/courses?search=${searchQuery}
					${selectedCategories ? `&categories=${selectedCategories.join(",")} ` : ""}`);
			onClose();
		}
	};

	const updatePreview = useCallback(() => {
		if (searchInputRef.current.value || selectedCategories.length) {
			setIsLoading(true);
			fetchCourses(
				1,
				searchInputRef.current.value,
				selectedCategories.join(",")
			);
		}
	}, [fetchCourses, selectedCategories]);

	useEffect(() => {
		updatePreview();
	}, [updatePreview]);

	useEffect(() => {
		setIsLoading(false);
	}, [courses]);

	let updatePreviewTimer: NodeJS.Timeout;

	return ReactDOM.createPortal(
		<ModalContainer>
			<ContentContainer ref={modalContentRef}>
				<SearchRow>
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
					<div className="search-button" onClick={performSearch}>
						<SearchIcon />
					</div>
					<div
						className={`search-button ${
							filtersVisible ? "active" : ""
						}`}
						onClick={() => setFiltersVisible(!filtersVisible)}
					>
						<FiltersIcon />
					</div>
				</SearchRow>
				<FiltersContainer
					className={`${filtersVisible ? "visible" : ""}`}
				>
					<h2>Категории</h2>
					<div className="categories">
						{categories.map((category) => (
							<Category
								key={category.id}
								onClick={() => toggleCategory(category.id)}
								className={`${
									selectedCategories.includes(category.id)
										? "active"
										: ""
								}`}
							>
								{category.name["ru"]}
							</Category>
						))}
					</div>
				</FiltersContainer>
				<CoursePreviewList>
					{isLoading && <Loader />}
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
											course.rating.external
												.averageScore | 0
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
			</ContentContainer>
		</ModalContainer>,
		modalRoot
	);
};

export default SearchModal;
