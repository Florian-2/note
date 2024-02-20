import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
            <Select
                defaultValue={defaultValue}
                open={isOpen}
                onValueChange={(value) => onChange(value as SortBy)}
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                        <SelectTrigger className="gap-2" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Trier la liste</p>
                    </TooltipContent>
                </Tooltip>

                <SelectContent>
                    <SelectGroup>
                        <SelectItem value={SortBy.NameAsc}>Nom (asc)</SelectItem>
                        <SelectItem value={SortBy.NameDesc}>Nom (desc)</SelectItem>
                        <SelectItem value={SortBy.DateAsc}>Date de création (asc)</SelectItem>
                        <SelectItem value={SortBy.DateDesc}>Date de création (desc)</SelectItem>
                        <SelectItem value={SortBy.Favorite}>Favoris</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
