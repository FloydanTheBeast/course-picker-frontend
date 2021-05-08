import React, { useState } from "react";
import { useAuth } from "providers/authProvider";
import { ProfileContainer, ProfileHeader } from "./styled";
import UserProfileIcon from "icons/userProfile.svg";
import Accordion from "./Accordion";
import { UsersService } from "services/usersService";
import CourseList from "components/CourseList";

const ProfilePage = () => {
	const {
		authState: { user }
	} = useAuth();

	const [favouriteCourses, setFavouriteCourses] = useState<CoursePreview[]>(
		[]
	);

	const [viewedCourses, setViewedCourses] = useState<CoursePreview[]>([]);

	return (
		<ProfileContainer>
			<ProfileHeader>
				<UserProfileIcon className="user-icon" />
				<div className="user-info">
					<p>
						Имя пользователя:{" "}
						<span className="user-info_field">{user.username}</span>
					</p>
					<p>
						Электронная почта:{" "}
						<span className="user-info_field">{user.email}</span>
					</p>
				</div>
			</ProfileHeader>
			<Accordion
				title="Избранные курсы"
				onFirstExpansion={() => {
					UsersService.getFavourite().then((courses) =>
						setFavouriteCourses(courses)
					);
				}}
			>
				<CourseList courses={favouriteCourses} />
			</Accordion>
			<Accordion
				title="Просмотренные курсы"
				onFirstExpansion={() => {
					UsersService.getViewed().then((courses) =>
						setViewedCourses(courses)
					);
				}}
			>
				<CourseList courses={viewedCourses} />
			</Accordion>
		</ProfileContainer>
	);
};

export default ProfilePage;
