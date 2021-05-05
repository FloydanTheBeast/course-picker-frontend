import Button from "components/Button";
import Input from "components/Input";
import MessageBox from "components/MessageBox";
import { useAuth } from "providers/authProvider";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { SignUpData } from "services/authService";
import { Label, SignUpForm } from "./styled";

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();
	const [hasSignedUp, setHasSignedUp] = useState(false);
	const {
		authState: { isAuthenticated },
		signup
	} = useAuth();

	const [serverError, setServerError] = useState("");

	const onSubmit = (data: SignUpData) => {
		signup(data)
			.then((res) => {
				setHasSignedUp(true);
			})
			// TODO: Обрабатывать ошибку соответствующе, показывать
			.catch((error) =>
				setServerError(
					error.response?.data?.error || "Внутренная ошибка сервера"
				)
			);
	};

	// TODO: Сообщение об успехе регистрации
	return isAuthenticated || hasSignedUp ? (
		<Redirect to="/" />
	) : (
		<SignUpForm onSubmit={handleSubmit(onSubmit)}>
			{serverError && (
				<MessageBox
					type="error"
					message={serverError}
					primary
					closable
					onClose={() => setServerError("")}
					closeTimeout={3000}
				/>
			)}
			<Label htmlFor="">Электронная почта</Label>
			{errors.email && (
				<MessageBox type="error" message={errors.email.message} />
			)}
			<Input
				{...register("email", {
					pattern: {
						value: /^\S+@\S+\.\S+$/,
						message: "Некорректный адрес"
					},
					required: { value: true, message: "Обязательное поле" }
				})}
				placeholder="Введите адрес электронной почты"
			/>
			<Label htmlFor="">Имя пользователя</Label>
			{errors.username && (
				<MessageBox type="error" message={errors.username.message} />
			)}
			<Input
				{...register("username", {
					required: { value: true, message: "Обязательное поле" }
				})}
				placeholder="Введите имя пользователя"
			/>
			<Label htmlFor="">Пароль</Label>
			{errors.password && (
				<MessageBox type="error" message={errors.password.message} />
			)}
			<Input
				type="password"
				{...register("password", {
					required: { value: true, message: "Обязательное поле" }
				})}
				placeholder="Введите пароль"
			/>
			<Button type="submit">Зарегистрироваться</Button>
		</SignUpForm>
	);
};

export default SignUp;
