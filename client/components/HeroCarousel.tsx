import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const banners = [
  { id: 1, image: "/banners/banner1.jpg", link: "/product/1" },
  { id: 2, image: "/banners/banner2.jpg", link: "/product/2" },
  { id: 3, image: "/banners/banner3.jpg", link: "/product/3" },
];

export default function HeroCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hoverEdge, setHoverEdge] = useState<"left" | "right" | null>(null);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    const t = setInterval(() => {
      goRight();
    }, 6000);
    return () => clearInterval(t);
  }, [index]);

  /* ================= NAV ================= */
  const scrollTo = (i: number) => {
    if (!trackRef.current) return;
    const w = trackRef.current.clientWidth;
    trackRef.current.scrollTo({ left: w * i, behavior: "smooth" });
    setIndex(i);
  };

  const goLeft = () =>
    scrollTo(index === 0 ? banners.length - 1 : index - 1);

  const goRight = () =>
    scrollTo(index === banners.length - 1 ? 0 : index + 1);

  /* ================= EDGE DETECTION ================= */
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < 80) setHoverEdge("left");
    else if (x > rect.width - 80) setHoverEdge("right");
    else setHoverEdge(null);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-6">
      {/* DEPTH BLUR BACKDROP */}
      <div className="absolute inset-0 -z-10 scale-105 blur-3xl opacity-40">
        <img
          src={banners[index].image}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>

      {/* CAROUSEL */}
      <div
        ref={trackRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHoverEdge(null)}
        className="relative overflow-hidden rounded-xl"
      >
        <div className="flex">
          {banners.map((b) => (
            <Link
              key={b.id}
              to={b.link}
              className="min-w-full select-none"
            >
              <img
                src={b.image}
                draggable={false}
                className="h-[420px] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                alt=""
              />
            </Link>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          onClick={goLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-300
            ${
              hoverEdge === "left"
                ? "opacity-100"
                : "opacity-0 md:opacity-0"
            }
            md:block`}
        >
          <ChevronLeft
            size={44}
            className="text-white/80 hover:text-white transition-transform hover:-translate-x-1"
          />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={goRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300
            ${
              hoverEdge === "right"
                ? "opacity-100"
                : "opacity-0 md:opacity-0"
            }
            md:block`}
        >
          <ChevronRight
            size={44}
            className="text-white/80 hover:text-white transition-transform hover:translate-x-1"
          />
        </button>

        {/* DOTS (INSIDE) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-md">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === i ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
