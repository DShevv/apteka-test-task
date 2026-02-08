"use client";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import { useState } from "react";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={handelClick}
      className="cursor-pointer relative group text-chart-3 hover:text-chart-2 transition-colors duration-300 absolute top-2 right-2 z-10"
      aria-label="Добавить в избранное"
      aria-pressed={isFavorite}
    >
      <HeartIcon
        className="size-5"
        fill={isFavorite ? "currentColor" : "none"}
      />

      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-center hidden group-hover:block bg-chart-3 text-white text-xs rounded-full px-2 py-1">
        В избранное
      </span>
    </Button>
  );
};

export default FavoriteButton;
