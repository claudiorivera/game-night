import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function TypographyTiny({ children }: Props) {
  return (
    <p className="text-sm text-slate-500 dark:text-slate-400">{children}</p>
  );
}
