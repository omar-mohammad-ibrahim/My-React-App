import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "@/components/ui/carousel";
import { Gem } from "lucide-react";
import AddToCartModal from "@/components/cart/AddToCartModal";
import Button from "@/components/ui/Button";
import CountryFlag from "@/components/common/CountryFlag";

export default function ProductCardHorizontal({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    id,
    title = "MOKE Electric Car, Oreion Sand Reeper Off Road All Terrain Buggies",
    image = "https://placehold.co/300x300?text=No+Image",
    images = [],
  } = product || {};

  const productImages = images?.length > 0 ? images : [image];

  return (
    <div className="relative rounded-xl border border-border bg-card p-4 text-foreground transition-shadow hover:shadow-md text-start">
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <GalleryContainer id={id} images={productImages} title={title} />
        <InfoContainer id={id} product={product} />
        <ActionsContainer onAddToCart={() => setIsModalOpen(true)} />
      </div>

      <AddToCartModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

function GalleryContainer({ id, images = [], title = "Product" }) {
  return (
    <div className="w-full sm:w-56 shrink-0 relative">
      <Carousel opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((imgUrl, index) => (
            <CarouselItem key={index}>
              <Link to={`/product/${id}`} className="block">
                <div className="aspect-square flex items-center justify-center rounded-lg bg-muted/30 p-2 overflow-hidden border border-border/50">
                  <img
                    src={imgUrl}
                    alt={`${title} - ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="start-2 bg-background/80 shadow-xs border-border" />
        <CarouselNext className="end-2 bg-background/80 shadow-xs border-border" />
        <CarouselDots className="bottom-2" />
      </Carousel>
    </div>
  );
}

function InfoContainer({ id, product }) {
  const { t } = useTranslation();
  const currentCurrency = localStorage.getItem("appCurrency") || "JOD";

  const {
    title = "MOKE Electric Car, Oreion Sand Reeper Off Road All Terrain Buggies",
    price = 2127,
    moq = 1,
    unit,
    supplier = {
      name: "Zhanjiang Kingone Vehicle Co., Ltd.",
      years: 9,
      country: "CN",
    },
  } = product || {};

  const numericPrice = Number(price) || 0;
  const unitLabel =
    unit ||
    (Number(moq) > 1
      ? t("productCard.pieces", "pieces")
      : t("productCard.piece", "piece"));

  return (
    <div className="flex-1 flex flex-col justify-between self-stretch py-1">
      <div>
        <Link to={`/product/${id}`}>
          <h3 className="text-base sm:text-lg font-medium text-foreground hover:text-primary line-clamp-2 leading-snug transition-colors mb-3">
            {title}
          </h3>
        </Link>

        <div className="flex flex-col gap-1 mb-4">
          <div className="text-2xl font-black text-foreground tracking-tight">
            {currentCurrency} {numericPrice.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground font-normal">
            {t("productCard.minOrder", {
              moq,
              unit: unitLabel,
              defaultValue: `Min. order: ${moq} ${unitLabel}`,
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-xs pt-3 border-t border-border/60">
        <span className="text-muted-foreground line-clamp-1 w-fit">
          {supplier?.name || "Verified Manufacturer Co., Ltd."}
        </span>

        <div className="flex items-center gap-3 text-muted-foreground mt-0.5">
          <div className="flex items-center gap-1">
            <Gem className="w-3.5 h-3.5 text-muted-foreground" />
            <span>
              {t("productCard.yearsCount", {
                count: supplier?.years || 1,
                defaultValue: `${supplier?.years || 1} yrs`,
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <CountryFlag code={supplier?.country || "CN"} className="w-4 h-3" />
            <span>{supplier?.country || "CN"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionsContainer({ onAddToCart }) {
  const { t } = useTranslation();

  return (
    <div className="w-full sm:w-36 shrink-0 flex flex-col gap-2.5 self-center sm:self-start pt-1">
      <Button
        onClick={onAddToCart}
        variant="primary"
        className="w-full rounded-full shadow-sm"
      >
        {t("productCard.addToCart", "Add to cart")}
      </Button>

      <Button variant="outline" className="w-full rounded-full">
        {t("productCard.chatNow", "Chat now")}
      </Button>
    </div>
  );
}
