import React from "react";
import { useForm } from "react-hook-form";
import { SignUpForm, Label } from "./styled";
import Button from "../../components/Button";
import Input from "../../components/Input";

const onSubmit = (data: any) => {
	console.log(data);
};

const SignUp = () => {
	const { register, handleSubmit } = useForm();

	return (
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
				{...register("passowrd")}
				placeholder="Введите пароль"
			/>
			<Button type="submit">Зарегистрироваться</Button>
		</SignUpForm>
	);
};

export default SignUp;
