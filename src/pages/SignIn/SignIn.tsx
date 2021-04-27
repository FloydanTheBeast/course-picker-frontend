import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "providers/authProvider";
import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { SignInData } from "services/auth";
import { Label, SignInForm } from "./styled";

const SignIn = () => {
	const { register, handleSubmit } = useForm();
	const { isAuthenticated, setIsAuthenticated, signin } = useAuth();

	const onSubmit = (data: SignInData & { emailOrUsername: string }) => {
		let signInData: SignInData;

		if (/\S+@\S+\.\S+/.test(data.emailOrUsername)) {
			signInData = {
				email: data.emailOrUsername,
				password: data.password
			};
		} else {
			signInData = {
				username: data.emailOrUsername,
				password: data.password
			};
		}

		signin(signInData)
			.then((res) => {
				setIsAuthenticated(true);
			})
			// TODO: Обрабатывать ошибку соответствующе, показывать
			.catch((error) => console.log(error.response));
	};

	return isAuthenticated ? (
		<Redirect to="/" />
	) : (
		// TODO: Добавить валидацию
		<SignInForm onSubmit={handleSubmit(onSubmit)}>
			<Label htmlFor="">Электронная почта/имя пользователя</Label>
			<Input
				{...register("emailOrUsername")}
				placeholder="Введите адрес электронной почты"
			/>
			<Label htmlFor="">Пароль</Label>
			<Input
				type="password"
				{...register("password")}
				placeholder="Введите пароль"
			/>
			<Button type="submit">Зарегистрироваться</Button>
		</SignInForm>
	);
};

export default SignIn;
