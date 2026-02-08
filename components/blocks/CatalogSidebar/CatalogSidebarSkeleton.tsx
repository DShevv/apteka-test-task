import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const CatalogSidebarSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-background rounded-xl ">
      <Skeleton className="w-full h-20" />
      <Separator />
      <Skeleton className="w-full h-20" />
      <Separator />
      <Skeleton className="w-full h-20" />
    </div>
  );
};

export default CatalogSidebarSkeleton;
