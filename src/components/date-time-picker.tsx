"use client";

import { format, formatISO } from "date-fns";
import { AtSign, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DateTimePicker({
	fieldName,
	initialDate,
	errors,
	label,
}: {
	fieldName: string;
	initialDate?: Date;
	errors: Array<string> | undefined;
	label?: string;
}) {
	const [date, setDate] = useState<Date | undefined>(initialDate);
	const [time, setTime] = useState<string>(
		format(initialDate ?? new Date(), "HH:mm"),
	);

	return (
		<>
			<input
				type="hidden"
				name={fieldName}
				defaultValue={
					date
						? `${formatISO(date, { representation: "date" })}T${time}`
						: undefined
				}
			/>

			<div className="flex flex-col gap-1">
				{!!label && <Label>{label}</Label>}

				<Popover>
					<div className="flex items-center justify-between gap-2">
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"flex-1 font-normal",
									!date && "text-muted-foreground",
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? format(date, "MMMM d, yyyy") : <span>Pick a date</span>}
							</Button>
						</PopoverTrigger>

						<AtSign className="size-4 text-muted-foreground" />

						<Input
							className="flex-1"
							type="time"
							value={time}
							onChange={(e) => setTime(e.target.value)}
						/>
					</div>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={date}
							onSelect={(date) => {
								if (!date) return;
								setDate(date);
							}}
							autoFocus
						/>
					</PopoverContent>
				</Popover>

				{!!errors && (
					<div className="text-red-500 text-xs">
						{errors.map((error) => (
							<div key={error}>{error}</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
