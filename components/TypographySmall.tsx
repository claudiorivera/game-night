import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographySmall({ children }: Props) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}
