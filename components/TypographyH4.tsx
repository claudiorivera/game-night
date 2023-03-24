import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographyH4({ children }: Props) {
  return (
    <h4 className="pt-2 text-xl font-semibold tracking-tight">{children}</h4>
  );
}
