import * as React from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);

  const onSelect = React.useCallback((api) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    onSelect(api);

    api.on("reInit", () => {
      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
    });
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        scrollSnaps,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden rounded-lg"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({ className, ...props }) {
  const { orientation, scrollPrev, canScrollPrev, scrollSnaps } = useCarousel();

  // إخفاء الزر تماماً إذا كانت هناك صورة واحدة فقط
  if (scrollSnaps.length <= 1) return null;

  return (
    <button
      type="button"
      data-slot="carousel-previous"
      className={cn(
        "absolute z-10 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur-xs text-foreground shadow-xs transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-0 cursor-pointer",
        orientation === "horizontal"
          ? "start-2 inset-y-0 my-auto h-7 w-7"
          : "top-2 left-1/2 -translate-x-1/2 h-7 w-7 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollPrev();
      }}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

function CarouselNext({ className, ...props }) {
  const { orientation, scrollNext, canScrollNext, scrollSnaps } = useCarousel();

  // إخفاء الزر تماماً إذا كانت هناك صورة واحدة فقط
  if (scrollSnaps.length <= 1) return null;

  return (
    <button
      type="button"
      data-slot="carousel-next"
      className={cn(
        "absolute z-10 inline-flex items-center justify-center rounded-full border border-border/70 bg-background/80 backdrop-blur-xs text-foreground shadow-xs transition-all hover:bg-background disabled:pointer-events-none disabled:opacity-0 cursor-pointer",
        orientation === "horizontal"
          ? "end-2 inset-y-0 my-auto h-7 w-7"
          : "bottom-2 left-1/2 -translate-x-1/2 h-7 w-7 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        scrollNext();
      }}
      {...props}
    >
      <ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
      <span className="sr-only">Next slide</span>
    </button>
  );
}

function CarouselDots({ className, ...props }) {
  const { api, scrollSnaps } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  // لا تظهر النقاط إذا كانت هناك صورة واحدة فقط
  if (scrollSnaps.length <= 1) return null;

  return (
    <div
      className={cn(
        "absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10",
        className,
      )}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            api?.scrollTo(index);
          }}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
            index === selectedIndex
              ? "w-4 bg-foreground/90 shadow-xs"
              : "w-1.5 bg-foreground/30 hover:bg-foreground/50",
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
  CarouselDots,
};
