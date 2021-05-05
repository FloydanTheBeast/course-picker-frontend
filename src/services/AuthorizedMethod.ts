import { AxiosError, AxiosResponse } from "axios";
import { AuthService } from "services/authService";

const AuthorizedMethod = (
	target: Object,
	propertyKey: string,
	descriptor: TypedPropertyDescriptor<
		(...args: any[]) => Promise<AxiosResponse<any>>
	>
): TypedPropertyDescriptor<any> => {
	const method = descriptor.value;

	descriptor.value = (...rest) => {
		return method
			.call(target, ...rest, {
				Authorization: `Bearer ${localStorage.getItem("accessToken")}`
			})
			.catch((error: AxiosError) => {
				if (error.response.status === 401) {
					return AuthService.refreshToken().then(() => {
						console.log("Rerunning method...");
						return method
							.call(target, ...rest, {
								Authorization: `Bearer ${localStorage.getItem(
									"accessToken"
								)}`
							})
							.catch((error: AxiosError) => {
								throw error;
							});
					});
				} else {
					throw error;
				}
			});
	};

	return descriptor;
};

export default AuthorizedMethod;
