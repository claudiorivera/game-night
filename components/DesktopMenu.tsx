import { Button, CircularProgress } from "@mui/material";
import { adminLinks, userLinks } from "config";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export const DesktopMenu = () => {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const router = useRouter();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!session) {
    return (
      <Button color="inherit" onClick={() => router.push("/sign-in")}>
        Sign In
      </Button>
    );
  }

  return (
    <>
      {userLinks.map(({ title, url }) => (
        <Button
          color="inherit"
          key={title}
          onClick={() => {
            router.push(url);
          }}
        >
          {title}
        </Button>
      ))}
      {/* TODO: Create and protect admin routes */}
      {adminLinks.map(({ title, url }) => (
        <Button
          color="inherit"
          key={title}
          onClick={() => {
            router.push(url);
          }}
        >
          {title}
        </Button>
      ))}
      <Button
        color="inherit"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    </>
  );
};
