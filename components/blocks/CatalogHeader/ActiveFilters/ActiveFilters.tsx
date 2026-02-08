"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface ActiveFiltersProps {
  filters: {
    name: string;
    value: string | string[];
  }[];
}

const ActiveFilters = ({ filters }: ActiveFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClearFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name, value);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleClearAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    const sort = params.get("sort");

    const newParams = new URLSearchParams();

    if (sort) {
      newParams.set("sort", sort);
    }

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex grow gap-x-3 gap-y-2 flex-wrap">
      {filters.length > 0 && (
        <Button
          variant="outline"
          size="xs"
          className="hover:line-through hover:text-blue-400 cursor-pointer"
          aria-label="Очистить все фильтры"
          onClick={handleClearAllFilters}
        >
          Очистить <X className="size-3" />
        </Button>
      )}

      {filters.map((filter) => {
        const values =
          typeof filter.value === "string" ? [filter.value] : filter.value;

        return (
          <React.Fragment key={`${filter.name}`}>
            {values.map((value, index) => (
              <Button
                key={`${filter.name}-${value}-${index}`}
                variant="outline"
                size="xs"
                className="hover:line-through hover:text-blue-400 cursor-pointer"
                aria-label={`Очистить фильтр ${value}`}
                onClick={() => handleClearFilter(filter.name, value)}
              >
                {value} <X className="size-3" />
              </Button>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ActiveFilters;
