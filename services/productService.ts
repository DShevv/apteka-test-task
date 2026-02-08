import { parseFiltersFromProducts } from "@/lib/utils";
import { ActiveFiltersT, FilterT, ProductT } from "@/types/global";

export async function getProducts(): Promise<ProductT[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
        tags: ["products"],
      }
    });
    const data: ProductT[] = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFilteredProducts(page: number, sort: string, activeFilters: ActiveFiltersT): Promise<{ products: ProductT[], totalPages: number }> {
  try {
    const products = await getProducts();
    const filteredProducts = products.filter((product) => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (Array.isArray(values)) {
          return values.some((value) => product.characteristics[key as keyof typeof product.characteristics].includes(value));
        }
        return product.characteristics[key as keyof typeof product.characteristics].includes(values);
      });
    });


    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sort === "price-asc") {
        return a.price - b.price;
      }
      if (sort === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

    const paginatedProducts = sortedProducts.slice((page - 1) * 12, page * 12);

    return { products: paginatedProducts, totalPages: Math.ceil(sortedProducts.length / 12) };
  } catch (error) {
    console.error(error);
    return { products: [], totalPages: 0 };
  }
}

export async function getProductsFilters(): Promise<FilterT[]> {
  try {
    const products = await getProducts();
    return parseFiltersFromProducts(products);
  } catch (error) {
    console.error(error);
    return [];
  }
}