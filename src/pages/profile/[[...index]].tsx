import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
	<div className="flex justify-center p-4">
		<UserProfile path="/profile" routing="path" />
	</div>
);

export default UserProfilePage;
