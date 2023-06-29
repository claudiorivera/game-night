import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
	<div className="flex justify-center p-4">
		<SignUp
			path="/sign-up"
			routing="path"
			signInUrl="/sign-in"
			appearance={{
				elements: {
					formButtonPrimary: "btn-secondary btn w-full",
				},
				layout: {
					logoPlacement: "none",
				},
			}}
		/>
	</div>
);

export default SignUpPage;
