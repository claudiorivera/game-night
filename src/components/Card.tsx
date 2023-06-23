import Image from "next/image";
import { type ReactNode } from "react";

type CardProps = {
	children: ReactNode;
};

export const Card = ({ children }: CardProps) => {
	return <article className="rounded-lg border shadow-lg">{children}</article>;
};

type CardHeaderProps = {
	title: string;
	subheader: string;
};

const CardHeader = ({ title, subheader }: CardHeaderProps) => {
	return (
		<div className="p-4">
			<h4 className="font-bold">{title}</h4>
			<small className="text-slate-500">{subheader}</small>
		</div>
	);
};

Card.CardHeader = CardHeader;

type CardMediaProps = {
	image: string;
	title: string;
};

const CardMedia = ({ image, title }: CardMediaProps) => {
	return (
		<div className="relative aspect-video">
			<Image className="object-cover" fill src={image} alt={title} />
		</div>
	);
};

Card.CardMedia = CardMedia;

type CardContentProps = {
	children: ReactNode;
};

const CardContent = ({ children }: CardContentProps) => {
	return <div className="p-4">{children}</div>;
};

Card.CardContent = CardContent;
