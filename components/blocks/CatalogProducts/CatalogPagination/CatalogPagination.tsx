"use client";
import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useCallback } from "react";

interface CatalogPaginationProps {
  totalPages: number;
  page: number;
  perView?: number;
}

const CatalogPagination = ({
  totalPages,
  page,
  perView = 3,
}: CatalogPaginationProps) => {
  const searchParams = useSearchParams();
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const shownPages = pages.slice(
    Math.max(0, page - perView / 2),
    Math.min(totalPages, page + perView / 2)
  );

  const createPaginationHref = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);
      if (pageNumber === 1) {
        params.delete("page");
      } else {
        params.set("page", pageNumber.toString());
      }
      return `?${params.toString()}`;
    },
    [searchParams]
  );

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPaginationHref(page - 1)} />
          </PaginationItem>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink
              href={createPaginationHref(1)}
              aria-label="Перейти на первую страницу"
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {shownPages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={createPaginationHref(pageNumber)}
              isActive={pageNumber === page}
              aria-label={`Перейти на страницу ${pageNumber}`}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {perView < totalPages && page < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {!shownPages.includes(totalPages) && (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPaginationHref(totalPages)}
              aria-label={`Перейти на последнюю страницу`}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={createPaginationHref(page + 1)}
              aria-label={`Перейти на следующую страницу`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default CatalogPagination;
