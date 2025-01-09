"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CardItem {
  imagePath: string;
  alt: string;
}

const CARD_ITEMS: CardItem[] = [
  { imagePath: "/bear.png", alt: "Bear" },
  { imagePath: "/go.png", alt: "Go" },
  { imagePath: "/goats.png", alt: "Goats" },
  { imagePath: "/enjoy.png", alt: "Enjoy" },
];

function FeatureCard({ imagePath, alt }: CardItem) {
  return (
    <div className="relative overflow-hidden min-h-[500px] group rounded-lg">
      <Image
        src={imagePath}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 group-hover:scale-110 rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={alt === "Bear"} // Example: prioritize the first image
      />
    </div>
  );
}

export function InfiniteCarousel() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full min-h-screen p-4 space-y-4">
        {CARD_ITEMS.map((item, index) => (
          <FeatureCard key={index} {...item} />
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
                <FeatureCard {...item} />
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
