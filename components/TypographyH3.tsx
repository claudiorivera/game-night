import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographyH3({ children }: Props) {
  return (
    <h3 className="py-3 text-2xl font-semibold tracking-tight">{children}</h3>
  );
}
