import { ReactNode } from "react";

type Props = {
	condition: boolean;
	wrapper: (children: ReactNode) => ReactNode;
	children: ReactNode;
};

export const ConditionalWrapper = ({ condition, wrapper, children }: Props) => {
	return <>{condition ? wrapper(children) : children}</>;
};
