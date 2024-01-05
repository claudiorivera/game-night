import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
	return (
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
}
