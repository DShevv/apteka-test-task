import { CatalogHeader } from "@/components/blocks/CatalogHeader";
import {
  CatalogProducts,
  CatalogProductsSkeleton,
} from "@/components/blocks/CatalogProducts";
import {
  CatalogSidebar,
  CatalogSidebarSkeleton,
} from "@/components/blocks/CatalogSidebar";
import { Suspense } from "react";

interface HomeProps {
  searchParams: Promise<{
    sort: string;
    page: string;
    [key: string]: string | string[];
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { sort, page, ...activeFilters } = await searchParams;

  return (
    <main className="container mx-auto">
      <CatalogHeader sort={sort} activeFilters={activeFilters} />
      <div className="grid grid-cols-[280px_1fr] gap-4">
        <Suspense fallback={<CatalogSidebarSkeleton />}>
          <CatalogSidebar activeFilters={activeFilters} />
        </Suspense>
        <Suspense fallback={<CatalogProductsSkeleton />}>
          <CatalogProducts
            activeFilters={activeFilters}
            page={page}
            sort={sort}
          />
        </Suspense>
      </div>
    </main>
  );
}
