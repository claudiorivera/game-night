import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
	<div className="flex justify-center p-4">
		<SignIn
			path="/sign-in"
			routing="path"
			signUpUrl="/sign-up"
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

export default SignInPage;
