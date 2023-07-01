import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
	<div className="flex justify-center p-4">
		<SignUp
			appearance={{
				elements: {
					formButtonPrimary: "btn-secondary btn w-full",
				},
				layout: {
					logoPlacement: "none",
				},
			}}
			path="/sign-up"
			routing="path"
			signInUrl="/sign-in"
		/>
	</div>
);

export default SignUpPage;
