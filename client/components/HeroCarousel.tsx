import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";


// Import all banner images from the banners folder
const bannerImages = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
  "/banners/banner4.jpg",
  "/banners/banner5.jpg",
  "/banners/banner6.jpg",
  "/banners/banner7.jpg",
  "/banners/banner8.jpg",
  "/banners/banner9.jpg",
  "/banners/banner10.jpg",
].filter(() => true);


const banners = bannerImages.map((image, index) => ({
  id: index + 1,
  image: image,
  link: `/products`,
}));


export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  // Auto-advance every 5 seconds - PAUSE when hovered
  useEffect(() => {
    if (isHovered) return; // Don't auto-advance when hovering


    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered]); // Re-run when hover state changes


  // Handle mouse movement for 3-section detection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;


    const container = containerRef.current;
    if (!container) return;


    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    // Divide into 3 sections: left third, center third, right third
    const leftThird = width / 3;
    const rightThird = (width / 3) * 2;


    if (x < leftThird) {
      setShowLeftArrow(true);
      setShowRightArrow(false);
    } else if (x > rightThird) {
      setShowLeftArrow(false);
      setShowRightArrow(true);
    } else {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  };


  const handleMouseEnter = () => {
    setIsHovered(true); // Pause auto-advance
  };


  const handleMouseLeave = () => {
    setIsHovered(false); // Resume auto-advance
    if (!isMobile) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  };


  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };


  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };


  const goToSlide = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };


  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div
        ref={containerRef}
        className="relative h-[400px] rounded-xl overflow-hidden group"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{ touchAction: "pan-y" }}
      >
        {/* Carousel slides */}
        {banners.map((banner, index) => (
          <Link
            key={banner.id}
            to={banner.link}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="relative w-full h-full">
              {/* Background blur layer - NO SHADOW */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{
                  backgroundImage: `url(${banner.image})`,
                  filter: "blur(8px) brightness(0.7)",
                }}
              />


              {/* Main image with hover effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={banner.image}
                  alt={`Banner ${index + 1}`}
                  className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    userSelect: "none",
                  }}
                />
              </div>
            </div>
          </Link>
        ))}


        {/* Left Section - Clickable area for previous slide */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
          onClick={goToPrevious}
        >
          {/* Left Arrow - only visible when hovering left third */}
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              showLeftArrow || isMobile ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-white/90 hover:text-white transition-all hover:scale-110">
              <ChevronLeft size={40} strokeWidth={2.5} />
            </div>
          </div>
        </div>


        {/* Center Section - Clickable area for banner link */}
        <Link
          to={banners[currentIndex]?.link || "/products"}
          className="absolute left-1/3 top-0 bottom-0 w-1/3 z-20"
          draggable="false"
        />


        {/* Right Section - Clickable area for next slide */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer"
          onClick={goToNext}
        >
          {/* Right Arrow - only visible when hovering right third */}
          <div
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              showRightArrow || isMobile ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-white/90 hover:text-white transition-all hover:scale-110">
              <ChevronRight size={40} strokeWidth={2.5} />
            </div>
          </div>
        </div>


        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-sm bg-black/30">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToSlide(index, e)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
