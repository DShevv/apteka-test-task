import { ActiveFiltersT } from "@/types/global";
import SortSelect from "./SortSelect/SortSelect";
import ActiveFilters from "./ActiveFilters/ActiveFilters";

interface CatalogHeaderProps {
  sort: string;
  activeFilters: ActiveFiltersT;
}

const sortOptions = [
  { label: "По релевантности", value: "default" },
  { label: "Сначала дешевые", value: "price-asc" },
  { label: "Сначала дорогие", value: "price-desc" },
];

const CatalogHeader = ({ sort, activeFilters }: CatalogHeaderProps) => {
  return (
    <div className="flex gap-2 py-2">
      <ActiveFilters
        filters={Object.entries(activeFilters).map(([name, value]) => ({
          name,
          value,
        }))}
      />

      <SortSelect
        defaultValue={sort || "default"}
        sortOptions={sortOptions}
        placeholder="Сортировка"
      />
    </div>
  );
};

export default CatalogHeader;
