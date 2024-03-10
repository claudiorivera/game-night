import Image from "next/image";
import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
	return <article className="rounded-lg border shadow-lg">{children}</article>;
}

function CardHeader({
	title,
	subheader,
}: {
	title: string;
	subheader: string;
}) {
	return (
		<div className="p-4">
			<h4 className="font-bold">{title}</h4>
			<small className="text-slate-500">{subheader}</small>
		</div>
	);
}

Card.CardHeader = CardHeader;

function CardMedia({ image, title }: { image: string; title: string }) {
	return (
		<div className="relative aspect-video">
			<Image alt={title} className="object-cover" fill src={image} />
		</div>
	);
}

Card.CardMedia = CardMedia;

function CardContent({ children }: { children: ReactNode }) {
	return <div className="p-4">{children}</div>;
}

Card.CardContent = CardContent;
