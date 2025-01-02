"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CardItem {
  imagePath: string;
}

const CARD_ITEMS: CardItem[] = [
  { imagePath: "/life.png" },
  { imagePath: "/pov.png" },
  { imagePath: "/ride.png" },
  { imagePath: "/pressure.png" },
];

function FeatureCard({ imagePath }: { imagePath: string }) {
  return (
    <div className="relative overflow-hidden min-h-[500px] group rounded-lg">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 rounded-lg"
        style={{ backgroundImage: `url(${imagePath})` }}
      />
    </div>
  );
}

export function InfiniteCarousel2() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full min-h-screen p-4 space-y-4">
        {CARD_ITEMS.map((item, index) => (
          <FeatureCard key={index} imagePath={item.imagePath} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto pl-24">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {CARD_ITEMS.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <FeatureCard imagePath={item.imagePath} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-16 hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
}
