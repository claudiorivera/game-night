import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="flex justify-center p-4">
			<SignIn
				appearance={{
					elements: {
						formButtonPrimary: "btn-secondary btn w-full",
					},
					layout: {
						logoPlacement: "none",
					},
				}}
				path="/sign-in"
				routing="path"
				signUpUrl="/sign-up"
			/>
		</div>
	);
}
