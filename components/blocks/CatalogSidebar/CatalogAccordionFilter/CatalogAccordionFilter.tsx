"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FILTER_NAMES } from "@/conf/consts";
import { cn } from "@/lib/utils";
import { FilterT } from "@/types/global";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CatalogAccordionFilterProps {
  filter: FilterT;
  activeValues: string | string[];
  onChange: (name: string, value: string, checked: boolean) => void;
}

const CatalogAccordionFilter = ({
  filter,
  activeValues,
  onChange,
}: CatalogAccordionFilterProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-2"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between cursor-pointer "
          aria-label={`Фильтр ${FILTER_NAMES[filter.name]}`}
        >
          {FILTER_NAMES[filter.name]}{" "}
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              isOpen ? "rotate-180" : ""
            )}
          />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className=" max-h-[300px] overflow-y-auto">
        <FieldGroup className="flex flex-col gap-2 mx-auto w-56">
          {filter.values.map((value) => {
            const isActive =
              typeof activeValues === "string"
                ? activeValues === value
                : activeValues.includes(value);

            return (
              <Field key={`${filter.name}-${value}`} orientation="horizontal">
                <FieldLabel
                  htmlFor={`${filter.name}-${value}`}
                  className="text-sm text-muted-foreground cursor-pointer has-data-[state=checked]:bg-transparent"
                  aria-label={`Фильтр ${FILTER_NAMES[filter.name]} ${value}`}
                >
                  <Checkbox
                    id={`${filter.name}-${value}`}
                    name={`${filter.name}-${value}`}
                    className="w-5 h-5 data-[state=checked]:bg-chart-2 data-[state=checked]:text-primary-foreground data-[state=checked]:border-chart-2 cursor-pointer"
                    checked={isActive}
                    onCheckedChange={(checked) => {
                      onChange(filter.name, value, !!checked);
                    }}
                  />
                  {value}
                </FieldLabel>
              </Field>
            );
          })}
        </FieldGroup>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CatalogAccordionFilter;
