import React from "react";
import { useForm } from "react-hook-form";
import { SignUpForm } from "./styled";
import Button from "../../components/Button";

const onSubmit = (data: any) => {
	console.log(data);
};

const SignUp = () => {
	const { register, handleSubmit } = useForm();

	return (
		<SignUpForm onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor="">Электронная почта</label>
			<input {...register("email")} />
			<label htmlFor="">Имя пользователя</label>
			<input {...register("username")} />
			<label htmlFor="">Пароль</label>
			<input type="password" {...register("passowrd")} />
			<Button type="submit">Зарегистрироваться</Button>
		</SignUpForm>
	);
};

export default SignUp;
