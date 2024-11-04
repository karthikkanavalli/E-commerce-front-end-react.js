import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  // const [emblaRef] = useEmblaCarousel();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="h-full overflow-hidden bg-transparent embla" ref={emblaRef}>
      <div className="flex h-full bg-transparent embla__container">
        <div className="flex-grow-0 flex-shrink-0 h-full min-w-0 embla__slide basis-full w-96">
          {" "}
          <div className="object-cover w-full h-full bg-homeBanner ">
            
          </div>
        </div>
        <div className="flex-grow-0 flex-shrink-0 h-full min-w-0 embla__slide basis-full">
          <h1>HIII</h1>
        </div>
        <div className="flex-grow-0 flex-shrink-0 h-full min-w-0 embla__slide basis-full">
          <h1>hello</h1>
        </div>
      </div>
    </div>
  );
}
