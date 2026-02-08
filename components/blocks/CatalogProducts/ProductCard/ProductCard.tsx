import { ProductT } from "@/types/global";
import FavoriteButton from "./FavoriteButton/FavoriteButton";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: ProductT;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="relative flex flex-col bg-card rounded-lg  hover:shadow-xl transition-shadow duration-300"
    >
      <FavoriteButton />
      <div className="p-4 relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={`${product.title} изображение`}
          fill
          className="object-contain object-center"
        />

        {product.characteristics.isByPrescription === "По рецепту" && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-chart-1 text-white text-xs rounded-md">
            По рецепту
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2 flex-1">
        <div className="text-lg font-bold">{product.price} p.</div>
        <div className="text-sm/[1em] hyphens-auto wrap-break-words line-clamp-3 mb-1 flex-[1_0_3em]  h-[3em]">
          {product.title}
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          {product.characteristics.country}, {product.characteristics.brand}
        </div>
        <Button
          variant="default"
          size="lg"
          className="w-full cursor-pointer bg-chart-2 hover:bg-chart-2/90 text-white"
          aria-label="Добавить в корзину"
        >
          В корзину
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
