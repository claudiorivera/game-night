const appTitle = "Game Night";
const primaryColor = "#2A9D8F"; // App bar color
const secondaryColor = "#E9C46A"; // Button color

type Link = {
	title: string;
	url: string;
};

const userLinks: Link[] = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Events",
		url: "/events",
	},
	{
		title: "Games",
		url: "/games",
	},
];

export { appTitle, primaryColor, secondaryColor, userLinks };
