import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	localStorage.removeItem("token");
	localStorage.removeItem("roles");
	localStorage.removeItem("userId");
	localStorage.removeItem("firstName");
	localStorage.removeItem("lastName");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formEl = event.currentTarget;
		const formData = new FormData(formEl);

		const jsonData = {};

		for (const [key, value] of formData.entries()) {
			jsonData[key] = value;
		}

		try {
			const response = await fetch(
				"http://localhost:8080/api/v1/auth/login",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(jsonData),
				},
			);

			const errorMsg = document.getElementById("errorMsg");
			const data = await response.json();

			if (!response.ok) {
				errorMsg.textContent = data.message || "Something went wrong";
				errorMsg.classList.remove("hidden");
			} else {
				errorMsg.classList.add("hidden");
				localStorage.setItem("token", data.data.token);
				localStorage.setItem("roles", data.data.roles);
				localStorage.setItem("userId", data.data.id);
				localStorage.setItem("firstName", data.data.firstName);
				localStorage.setItem("lastName", data.data.lastName);
				navigate("/accounts");
			}
		} catch (error) {
			navigate("/error", { state: { message: error.message } });
		}
	};

	const togglePassword = () => setShowPassword(!showPassword);

	return (
		<div className=" w-dvw animate-appear h-dvh bg-background flex">
			<div className="h-full  items-center w-6/10 flex flex-col justify-center py-20">
				<div className="bg-foreground py-20 flex flex-col justify-center">
					<div className="flex flex-col items-center gap-4">
						<div className="text-white font-black font-mont text-5xl">
							EVNLPs.
						</div>
						<div className="text-white font-normal font-mont text-2xl">
							Sign in to your account
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						method="post"
						className="px-30 w-full mt-5 "
					>
						<div className="flex flex-wrap -mx-3 mb-6 justify-center">
							<FieldSet className="w-full max-w-lg">
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor="username">
											Email
										</FieldLabel>
										<Input
											id="email"
											type="email"
											name="email"
											placeholder="andrewezzat@gmail.com"
										/>
									</Field>
									<Field>
										<FieldLabel htmlFor="password">
											Password
										</FieldLabel>
										<Input
											id="password"
											type="password"
											name="password"
											placeholder="••••••••"
										/>
									</Field>
								</FieldGroup>
							</FieldSet>

							<div className="w-full px-3 mt-10 flex flex-col items-center justify-center">
								<button
									type="submit"
									className=" w-1/3 border-white border-opacity-50 border-2 hover:text-background hover:bg-white transition-all text-white px-4 py-2 rounded cursor-pointer"
								>
									Login
								</button>
								<p
									id="errorMsg"
									className="text-red-700 text-xs italic hidden"
								></p>
							</div>
						</div>
					</form>
				</div>
			</div>

			<div className="h-full w-4/10 relative flex items-center justify-center">
				<img
					src="https://images.pexels.com/photos/10653885/pexels-photo-10653885.jpeg?_gl=1*1ce8x5l*_ga*MTMwMjIwNzY3MS4xNzcwMjMwMzY1*_ga_8JE65Q40S6*czE3NzAyMzAzNjQkbzEkZzEkdDE3NzAyMzA0MDckajE3JGwwJGgw"
					alt=""
					className="object-cover object-center h-full w-full absolute "
				/>
				<div className="animate-appear h-full w-full bg-black absolute opacity-50"></div>
				<div className="absolute text-white font-pop flex flex-col gap-4 items-center">
					<div className="animate-appear text-4xl font-bold">
						Hello Friend
					</div>
					<div className="animate-appear mt-2 flex font-light justify-center text-white ">
						<div className="text-sm my-3 mb-5">
							Don't have an account?
						</div>
						<Link
							to={"/register"}
							className="hover:opacity-80 text-sm my-3 ml-1 font-bold cursor-pointer"
						>
							Register now!
						</Link>
					</div>
				</div>
			</div>
		</div>

		// <div
		// 	className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center"
		// 	id="wrapper"
		// >
		// 	<div class="bg-white w-dvh h-150 flex flex-col py-5 px-10">
		// 		<h1 class="text-blue font-medium font-mont text-xl">Login</h1>
		// 		<div class="w-full h-0.5 mt-1 bg-blue"></div>

		// 		<form
		// 			onSubmit={handleSubmit}
		// 			method="post"
		// 			class=" w-full h-full mt-3"
		// 		>
		// 			<div class="flex flex-wrap -mx-3 mb-6">
		// 				<div class="w-full px-3 mb-6 md:mb-0">
		// 					<label
		// 						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
		// 						for="email"
		// 					>
		// 						Email
		// 					</label>
		// 					<input
		// 						class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
		// 						name="email"
		// 						type="email"
		// 						placeholder="e.g. name@gmail.com"
		// 					/>
		// 				</div>

		// 				<div class="w-full px-3 mb-6 md:mb-0 relative">
		// 					<label
		// 						class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
		// 						for="password"
		// 					>
		// 						Password
		// 					</label>
		// 					<input
		// 						type={showPassword ? "text" : "password"}
		// 						name="password"
		// 						placeholder="********"
		// 						class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 pr-16 mb-3 leading-tight focus:outline-none"
		// 					/>
		// <button
		// 	type="button"
		// 	onClick={togglePassword}
		// 	class="cursor-pointer absolute right-4 top-[50%] translate-y-[-50%] text-sm text-blue-600 hover:underline focus:outline-none"
		// >
		// 	{showPassword ? "Hide" : "Show"}
		// </button>
		// 				</div>

		// 				<div class="w-full px-3 mb-6 md:mb-0">
		// <button
		// 	type="submit"
		// 	class="bg-blue-500 text-white px-4 py-2 mb-3 rounded cursor-pointer"
		// >
		// 	Login
		// </button>
		// 					<p
		// 						id="errorMsg"
		// 						class="text-red-500 text-xs italic hidden"
		// 					>
		// 						Please fill out this field.
		// 					</p>
		// 				</div>
		// 			</div>
		// 		</form>
		// 	</div>
		// </div>
	);
}
