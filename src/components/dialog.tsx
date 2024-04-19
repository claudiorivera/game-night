import { Transition, Dialog as _Dialog } from "@headlessui/react";
import { Fragment } from "react";

export function Dialog({
	children,
	isOpen,
	onClose,
	title,
}: {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title: string;
}) {
	return (
		<Transition appear as={Fragment} show={isOpen}>
			<_Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<_Dialog.Panel className="flex w-full max-w-md transform flex-col gap-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<_Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									{title}
								</_Dialog.Title>
								{children}
							</_Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</_Dialog>
		</Transition>
	);
}
