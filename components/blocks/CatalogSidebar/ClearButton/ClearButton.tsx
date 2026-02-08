"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const ClearButton = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);
    const newParams = new URLSearchParams();

    const sort = params.get("sort");

    if (sort) {
      newParams.set("sort", sort);
    }
    router.push(`?${newParams.toString()}`);
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className="w-full cursor-pointer text-muted-foreground"
      onClick={handleClearFilters}
      aria-label="Сбросить фильтры"
    >
      Сбросить фильтры
    </Button>
  );
};

export default ClearButton;
