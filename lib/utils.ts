import { ActiveFiltersT, FilterNameT, FilterT, ProductT } from "@/types/global";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseFiltersFromProducts(products: ProductT[]): FilterT[] {
  const results = new Map<string, Set<string>>();

  products.forEach((product) => {
    Object.entries(product.characteristics).forEach(([key, value]) => {
      if (!results.has(key)) {
        results.set(key, new Set([value]));
      } else {
        results.get(key)?.add(value);
      }
    });
  });



  return Array.from(results.entries()).map(([name, values]) => ({
    name: name as FilterNameT,
    values: Array.from(values),
  }));

}

export const normalizeFiltersToArray = (value: string | string[] | undefined): string[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export const buildActiveFiltersSearchParams = (filters: ActiveFiltersT): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, values]) => {
    normalizeFiltersToArray(values).forEach((value) => params.append(key, value));
  });
  return params;
};
