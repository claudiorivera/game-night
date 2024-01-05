import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
	return (
		<div className="flex justify-center p-4">
			<UserProfile path="/profile" routing="path" />
		</div>
	);
}
