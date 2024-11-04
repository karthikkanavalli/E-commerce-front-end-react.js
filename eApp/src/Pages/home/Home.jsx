// import { useEffect, useState } from "react";

import { EmblaCarousel } from "./EmblaCarousel";

const Home = () => {
  return (
    <div className="relative w-full h-screen mr-4 bg-no-repeat bg-cover bg-homeBanner2 ">
      {/* Transparent Overlay */}
      <div className="absolute h-screen bg-black bg-opacity-50 -inset-0 -z-0"></div>

      {/* Carousel Content */}
      <div className="flex items-center justify-center w-full h-2/4">
        <EmblaCarousel />
      </div>
    </div>

    // <div className="relative w-full h-screen mr-4 ">
    //   <div className="w-full h-full bg-fixed bg-no-repeat bg-cover bg-homeBanner -z-10 ani"></div>
    //   <div className="relative">
    //     {/* Black Background Overlay */}
    //     {/* <div className="relative w-full h-screen bg-transparent before:absolute before:inset-0 before:bg-black before:bg-opacity-10 before:z-10" /> */}
    //     {/* <div className="absolute inset-0 z-10 w-full h-full bg-black bg-opacity-10" /> */}
    //     {/* Carousel Section */}
    //     <div className="absolute inset-0 w-full h-screen p-8 bg-none">
    //       <div className="z-20 w-4/5 m-auto rounded-lg shadow-xl h-96">
    //         <EmblaCarousel />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
