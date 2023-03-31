import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
	<UserProfile
		path="/profile"
		routing="path"
		appearance={{
			elements: {
				rootBox: "mx-auto p-4",
			},
		}}
	/>
);

export default UserProfilePage;
