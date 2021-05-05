import Button from "components/Button";
import Input from "components/Input";
import MessageBox from "components/MessageBox";
import { useAuth } from "providers/authProvider";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { SignInData } from "services/authService";
import { Label, SignInForm } from "./styled";

const SignIn: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm();

	const {
		authState: { isAuthenticated },
		dispatchAuthState,
		signin
	} = useAuth();

	const [serverError, setServerError] = useState("");

	const onSubmit = (data: SignInData & { emailOrUsername: string }) => {
		let signInData: SignInData;

		if (/^\S+@\S+\.\S+$/.test(data.emailOrUsername)) {
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
				dispatchAuthState({
					type: "signin",
					payload: res.data
				});
			})
			.catch((error) =>
				setServerError(
					error.response?.data?.error || "Внутренная ошибка сервера"
				)
			);
	};

	return isAuthenticated ? (
		<Redirect to="/" />
	) : (
		<SignInForm onSubmit={handleSubmit(onSubmit)}>
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
			<Label htmlFor="">Электронная почта/имя пользователя</Label>
			{errors.emailOrUsername && (
				<MessageBox
					type="error"
					message={errors.emailOrUsername.message}
				/>
			)}
			<Input
				{...register("emailOrUsername", {
					required: { value: true, message: "Обязательное поле" }
				})}
				placeholder="Введите адрес электронной почты"
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
			<Button type="submit">Войти</Button>
		</SignInForm>
	);
};

export default SignIn;
