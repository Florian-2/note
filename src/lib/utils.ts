import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDateRelative(startDate: Date, endDate: Date): string {
    const diff = endDate.getTime() - startDate.getTime();

    const relativeFormatter = new Intl.RelativeTimeFormat("fr", { numeric: "auto" });

    const hoursDifference = Math.abs(Math.round(diff / (1000 * 60 * 60)));
    const daysDifference = Math.abs(Math.round(diff / (1000 * 60 * 60 * 24)));

    if (hoursDifference < 24) {
        return relativeFormatter.format(-hoursDifference, "hour");
    }
    return relativeFormatter.format(-daysDifference, "day");
}
