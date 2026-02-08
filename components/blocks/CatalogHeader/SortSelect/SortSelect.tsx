"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface SelectProps {
  defaultValue: string;
  sortOptions: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  triggerClassName?: string;
  onValueChange?: (value: string) => void;
}

const SortSelect = ({
  defaultValue,
  placeholder = "Выберите значение",
  sortOptions,
}: SelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`?${params.toString()}`);
  };

  const defaultLabel =
    sortOptions.find((option) => option.value === defaultValue)?.label ??
    placeholder;

  return (
    <Select defaultValue={defaultValue} onValueChange={handleSortChange}>
      <SelectTrigger
        className={`bg-input w-[180px] cursor-pointer`}
        aria-label="Сортировка"
      >
        <SelectValue placeholder={placeholder}>{defaultLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((option, index) => (
            <SelectItem
              key={`${option.value}-${index}`}
              value={option.value}
              className="cursor-pointer"
              aria-label={`Выбрать сортировку ${option.label}`}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
