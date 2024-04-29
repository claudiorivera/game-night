"use client";

import { format, formatISO } from "date-fns";
import { AtSign, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/input";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Label } from "~/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { type InferFlattenedErrors, cn } from "~/lib/utils";

export function DateTimePicker({
	fieldName,
	initialDate,
	fieldErrors,
	label,
}: {
	fieldName: string;
	initialDate?: Date;
	fieldErrors?: InferFlattenedErrors["fieldErrors"][keyof InferFlattenedErrors["fieldErrors"]];
	label?: string;
}) {
	const [date, setDate] = useState<Date | undefined>(initialDate);
	const [time, setTime] = useState<string>(
		format(initialDate ?? new Date(), "HH:mm"),
	);

	return (
		<>
			<Input
				type="hidden"
				name={fieldName}
				value={
					date
						? `${formatISO(date, { representation: "date" })}T${time}`
						: undefined
				}
			/>

			<div className="flex flex-col gap-1">
				{!!label && <Label>{label}</Label>}

				<div className="flex justify-between gap-2 items-center">
					<Popover>
						<PopoverTrigger asChild className="w-full">
							<Button
								variant={"outline"}
								className={cn("font-normal", !date && "text-muted-foreground")}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? format(date, "MMMM d, yyyy") : <span>Pick a date</span>}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(date) => {
									if (!date) return;
									setDate(date);
								}}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<AtSign className="w-8 h-8 text-muted-foreground" />
					<div className="w-full">
						<Input
							type="time"
							value={time}
							onChange={(e) => setTime(e.target.value)}
						/>
					</div>
				</div>

				{!!fieldErrors &&
					fieldErrors.map((error) => (
						<div key={error.errorCode} className="text-xs text-red-500">
							{error.message}
						</div>
					))}
			</div>
		</>
	);
}
