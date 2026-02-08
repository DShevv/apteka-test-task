import { Skeleton } from "@/components/ui/skeleton";

const CatalogProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 ">
      <Skeleton className="w-full h-100 bg-background" />
      <Skeleton className="w-full h-100 bg-background" />
      <Skeleton className="w-full h-100 bg-background" />
      <Skeleton className="w-full h-100 bg-background" />
    </div>
  );
};

export default CatalogProductsSkeleton;
