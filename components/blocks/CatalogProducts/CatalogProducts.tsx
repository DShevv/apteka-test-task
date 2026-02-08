import { getFilteredProducts } from "@/services/productService";
import { ActiveFiltersT } from "@/types/global";
import ProductCard from "./ProductCard/ProductCard";
import CatalogPagination from "./CatalogPagination/CatalogPagination";

interface CatalogProductsProps {
  activeFilters: ActiveFiltersT;
  page: string;
  sort: string;
}

const CatalogProducts = async ({
  activeFilters,
  page,
  sort,
}: CatalogProductsProps) => {
  const { products, totalPages } = await getFilteredProducts(
    Number(page) || 1,
    sort,
    activeFilters
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {products.length === 0 && (
          <div className="col-span-4 mt-10">
            <p className="text-center text-lg font-semibold ">
              Ничего не найдено
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Попробуйте изменить фильтры
            </p>
          </div>
        )}
      </div>
      <CatalogPagination totalPages={totalPages} page={Number(page) || 1} />
    </div>
  );
};

export default CatalogProducts;
