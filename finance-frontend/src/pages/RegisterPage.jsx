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
export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
		const errorMsg = document.getElementById("errorMsg");
		const jsonData = {};

		for (const [key, value] of formData.entries()) {
			jsonData[key] = value;
		}

		console.log(JSON.stringify(jsonData));

		if (jsonData["password"] != jsonData["confirmPassword"]) {
			errorMsg.textContent = "Passwords don't match!";
			errorMsg.classList.remove("hidden");
			return;
		}

		try {
			const response = await fetch(
				"http://localhost:8080/api/v1/auth/register",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(jsonData),
				},
			);

			const data = await response.json();

			if (!response.ok) {
				errorMsg.textContent = data.message || "Something went wrong";
				errorMsg.classList.remove("hidden");
			} else {
				errorMsg.classList.add("hidden");
				navigate("/login");
			}
		} catch (error) {
			navigate("/error", { state: { message: error.message } });
		}
	};

	const togglePassword = () => setShowPassword(!showPassword);
	const toggleConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);

	return (
		<div className=" w-dvw h-dvh  bg-blue flex">
			<div className="h-full w-4/10 relative flex items-center justify-center">
				<img
					src="https://images.pexels.com/photos/259209/pexels-photo-259209.jpeg?_gl=1*1uxuiol*_ga*MTMwMjIwNzY3MS4xNzcwMjMwMzY1*_ga_8JE65Q40S6*czE3NzAyMzI3NDQkbzIkZzEkdDE3NzAyMzI4MDgkajU5JGwwJGgw"
					alt=""
					className="object-cover object-center h-full w-full absolute "
				/>
				<div className="animate-appear h-full w-full bg-black absolute opacity-50"></div>
				<div className="absolute text-white font-pop flex flex-col gap-4 items-center">
					<div className="animate-appear text-4xl font-bold">
						Welcome Back
					</div>
					<div className="animate-appear mt-2 flex font-light justify-center text-white ">
						<div className="text-sm my-3 mb-5">
							Already have an account?
						</div>
						<Link
							to={"/login"}
							className="hover:opacity-80 text-sm my-3 ml-1 font-bold cursor-pointer"
						>
							Login now!
						</Link>
					</div>
				</div>
			</div>
			<div className="animate-appear h-full items-center bg-background w-6/10 flex flex-col justify-center py-20">
				<div className="bg-foreground py-20">
					<div className="flex flex-col items-center gap-4">
						<div className="text-white font-black font-mont text-5xl">
							Enveloop
						</div>
						<div className="text-white font-normal font-mont text-2xl">
							Create a new account
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						method="post"
						className="px-30 w-full mt-5"
					>
						<div className="flex flex-col items-center w-full">
							<FieldSet className="w-full max-w-lg">
								<FieldGroup className="flex flex-row  justify-between">
									<Field className="w-2/3">
										<FieldLabel htmlFor="firstName">
											First Name
										</FieldLabel>
										<Input
											id="firstName"
											type="text"
											name="firstName"
											placeholder="Andrew"
										/>
									</Field>
									<Field className="w-2/3">
										<FieldLabel htmlFor="lastName">
											Last Name
										</FieldLabel>
										<Input
											id="lastName"
											type="text"
											name="lastName"
											placeholder="Ezzat"
										/>
									</Field>
								</FieldGroup>
								<Field className="w-full">
									<FieldLabel htmlFor="email">
										Email
									</FieldLabel>
									<Input
										id="email"
										type="email"
										name="email"
										placeholder="andrewezzat@gmail.com"
									/>
								</Field>
								<FieldGroup className="flex flex-row justify-between">
									<Field className="w-2/3">
										<FieldLabel htmlFor="firstName">
											Password
										</FieldLabel>
										<Input
											id="password"
											type="password"
											name="password"
											placeholder="••••••••"
										/>
									</Field>
									<Field className="w-2/3">
										<FieldLabel htmlFor="lastName">
											Confirm Password
										</FieldLabel>
										<Input
											id="confirmPassword"
											type="password"
											name="confirmPassword"
											placeholder="••••••••"
										/>
									</Field>
								</FieldGroup>
							</FieldSet>

							<div className="w-full px-3 mt-10  flex flex-col items-center justify-center">
								<button
									type="submit"
									className=" w-1/3 border-white border-opacity-50 border-2 hover:text-background hover:bg-white transition-all text-white px-4 py-2 my-3 rounded cursor-pointer"
								>
									Register
								</button>
								<p
									id="errorMsg"
									className="text-red-700 text-xs italic hidden"
								></p>
							</div>
						</div>

						{/* <div className="flex bg-red-400 items-center justify-center -mx-3">
						<FieldSet className="w-full">
							<FieldGroup>
								<div className="w-full flex justify-center px-3 mb-6 gap-4 bg-white">
									<Field>
										<FieldLabel htmlFor="firstName">
											First Name
										</FieldLabel>
										<Input
											id="firstName"
											type="text"
											name="firstName"
											placeholder="Andrew"
										/>
									</Field>
									<Field>
										<FieldLabel htmlFor="lastName">
											First Name
										</FieldLabel>
										<Input
											id="lastName"
											type="text"
											name="lastName"
											placeholder="Ezzat"
										/>
									</Field>
								</div>
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

						<div className="w-full px-3  flex flex-col items-center justify-center">
							<button
								type="submit"
								className=" w-1/3 border-white border-2 hover:text-blue hover:bg-white transition-all text-white px-4 py-2 mt-3 rounded cursor-pointer"
							>
								Register
							</button>
							<p
								id="errorMsg"
								className="text-white text-xs italic hidden"
							></p>
						</div>
					</div> */}
					</form>
				</div>
			</div>
		</div>
	);
}
