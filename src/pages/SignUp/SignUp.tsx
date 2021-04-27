import Button from "components/Button";
import Input from "components/Input";
import { useAuth } from "providers/authProvider";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { SignUpData } from "services/auth";
import { Label, SignUpForm } from "./styled";

const SignUp = () => {
	const { register, handleSubmit } = useForm();
	const [hasSignedUp, setHasSignedUp] = useState(false);
	const { signup } = useAuth();

	const onSubmit = (data: SignUpData) => {
		signup(data)
			.then((res) => {
				setHasSignedUp(true);
			})
			// TODO: Обрабатывать ошибку соответствующе
			.catch((error) => console.log(error.response));
	};

	return (
		// TODO: Добавить валидацию
		<>
			<SignUpForm onSubmit={handleSubmit(onSubmit)}>
				<Label htmlFor="">Электронная почта</Label>
				<Input
					{...register("email")}
					placeholder="Введите адрес электронной почты"
				/>
				<Label htmlFor="">Имя пользователя</Label>
				<Input
					{...register("username")}
					placeholder="Введите имя пользователя"
				/>
				<Label htmlFor="">Пароль</Label>
				<Input
					type="password"
					{...register("password")}
					placeholder="Введите пароль"
				/>
				<Button type="submit">Зарегистрироваться</Button>
			</SignUpForm>

			{/* TODO: Показывать сообщение об успехе */}
			{hasSignedUp && <Redirect to="/" />}
		</>
	);
};

export default SignUp;
