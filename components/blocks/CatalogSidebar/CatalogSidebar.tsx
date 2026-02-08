import { getProductsFilters } from "@/services/productService";
import { ActiveFiltersT } from "@/types/global";
import { CatalogFilters } from "./CatalogFilters";
import ClearButton from "./ClearButton/ClearButton";

interface CatalogSidebarProps {
  activeFilters: ActiveFiltersT;
}

const CatalogSidebar = async ({ activeFilters }: CatalogSidebarProps) => {
  const filters = await getProductsFilters();

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-background rounded-xl ">
      <CatalogFilters activeFilters={activeFilters} filters={filters} />

      <div className="sticky bottom-0 left-0 right-0 pb-3 pt-5 bg-background ">
        <ClearButton />
      </div>
    </div>
  );
};

export default CatalogSidebar;
