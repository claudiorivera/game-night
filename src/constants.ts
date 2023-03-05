export const appTitle = "Game Night";
export const primaryColor = "#2A9D8F"; // App bar color
export const secondaryColor = "#E9C46A"; // Button color

type Link = {
  title: string;
  url: string;
};

export const adminLinks: Link[] = [];
export const userLinks: Link[] = [
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
