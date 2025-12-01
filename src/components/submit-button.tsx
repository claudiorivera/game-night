import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
	render: (props: { isPending: boolean }) => React.ReactNode;
};

export function SubmitButton({ render }: SubmitButtonProps) {
	const { pending } = useFormStatus();

	return <>{render({ isPending: pending })}</>;
}
