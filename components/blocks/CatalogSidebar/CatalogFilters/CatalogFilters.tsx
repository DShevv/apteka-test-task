"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { CatalogAccordionFilter } from "../CatalogAccordionFilter";
import { ActiveFiltersT, FilterT } from "@/types/global";
import { useRouter, useSearchParams } from "next/navigation";
import { DEBOUNCE_DELAY } from "@/conf/consts";
import {
  buildActiveFiltersSearchParams,
  normalizeFiltersToArray,
} from "@/lib/utils";

interface CatalogFiltersProps {
  activeFilters: ActiveFiltersT;
  filters: FilterT[];
}

const CatalogFilters = ({ activeFilters, filters }: CatalogFiltersProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [localFilters, setLocalFilters] = useState(activeFilters);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const newParams = buildActiveFiltersSearchParams(localFilters);
      const currentParamsWithoutPage = new URLSearchParams(searchParams);
      currentParamsWithoutPage.delete("page");

      if (searchParams.has("sort")) {
        newParams.set("sort", searchParams.get("sort") ?? "");
      }

      if (newParams.toString() !== currentParamsWithoutPage.toString()) {
        router.push(`?${newParams}`, { scroll: false });
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [localFilters, router, searchParams]);

  const handleChangeFilter = useCallback(
    (name: string, value: string, checked: boolean) => {
      setLocalFilters((prev) => {
        const currentValues = normalizeFiltersToArray(prev[name]);

        const updatedValues = checked
          ? currentValues.includes(value)
            ? currentValues
            : [...currentValues, value]
          : currentValues.filter((v) => v !== value);

        if (updatedValues.length === 0) {
          const { [name]: _unused, ...rest } = prev;
          void _unused;
          return rest;
        }

        return { ...prev, [name]: updatedValues };
      });
    },
    []
  );

  return (
    <>
      {filters.map((filter, index) => (
        <React.Fragment key={filter.name}>
          {index > 0 && <Separator />}
          <CatalogAccordionFilter
            filter={filter}
            activeValues={localFilters[filter.name] ?? []}
            onChange={handleChangeFilter}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default CatalogFilters;
