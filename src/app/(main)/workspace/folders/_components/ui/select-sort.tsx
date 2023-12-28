import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SortBy } from "@/shared/types";
import { useState } from "react";

type Props = {
    onChange: (value: SortBy) => void;
    defaultValue: SortBy;
};

export function SelectOrderBy({ onChange, defaultValue }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex w-fit items-center gap-2">
            <Label onClick={() => setIsOpen(!isOpen)}>Trier:</Label>

            <Select
                defaultValue={defaultValue}
                open={isOpen}
                onValueChange={(value) => onChange(value as SortBy)}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <SelectTrigger className="gap-2">
                    <SelectValue placeholder="Trier" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={SortBy.NameAsc}>Nom (asc)</SelectItem>
                        <SelectItem value={SortBy.NameDesc}>Nom (desc)</SelectItem>
                        <SelectItem value={SortBy.DateAsc}>Date de création (asc)</SelectItem>
                        <SelectItem value={SortBy.DateDesc}>Date de création (desc)</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
