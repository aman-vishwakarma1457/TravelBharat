import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

const FALLBACK =
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85";

export default function ImageGallery({ images = [], name = "" }) {
  const safeImages =
    Array.isArray(images) && images.length > 0 ? images : [FALLBACK];

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const closeRef = useRef(null);

  const hasMultipleImages = safeImages.length > 1;

  const next = () => {
    if (!hasMultipleImages) return;

    setActive((current) => (current + 1) % safeImages.length);
  };

  const prev = () => {
    if (!hasMultipleImages) return;

    setActive(
      (current) =>
        (current - 1 + safeImages.length) % safeImages.length
    );
  };

  const closeLightbox = () => {
    setLightbox(false);
  };

  // Keyboard controls + body scroll lock
  useEffect(() => {
    if (!lightbox) return;

    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        prev();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox, safeImages.length]);

  // Prevent active index from becoming invalid
  useEffect(() => {
    if (active >= safeImages.length) {
      setActive(0);
    }
  }, [active, safeImages.length]);

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100 dark:bg-navy-800">
          <img
            src={safeImages[active]}
            alt={`${name} gallery image ${active + 1} of ${safeImages.length}`}
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.src = FALLBACK;
            }}
          />

          {/* Image Controls */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={prev}
                className="gallery-control absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-xl border shadow-lg backdrop-blur transition"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={next}
                className="gallery-control absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-xl border shadow-lg backdrop-blur transition"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="gallery-control absolute bottom-4 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-xl border shadow-lg backdrop-blur transition"
            aria-label="Open gallery fullscreen"
          >
            <Maximize2 size={18} />
          </button>

          {/* Counter */}
          <span
            className="absolute right-4 top-4 rounded-full bg-navy-950/70 px-3 py-1.5 text-xs font-bold text-white"
            aria-live="polite"
          >
            {active + 1}/{safeImages.length}
          </span>
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div
            className="grid grid-cols-4 gap-2"
            role="tablist"
            aria-label={`${name} gallery thumbnails`}
          >
            {safeImages.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                role="tab"
                aria-selected={active === index}
                aria-label={`Show image ${index + 1}`}
                className={`aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                  active === index
                    ? "border-orange-500"
                    : "border-transparent hover:border-orange-300"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = FALLBACK;
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-navy-950/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${name} fullscreen gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          {/* Previous */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={prev}
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Previous fullscreen image"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Fullscreen Image */}
          <img
            src={safeImages[active]}
            alt={`${name} fullscreen image`}
            className="max-h-[90vh] max-w-[85vw] rounded-2xl object-contain"
            onError={(event) => {
              event.currentTarget.src = FALLBACK;
            }}
          />

          {/* Next */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={next}
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Next fullscreen image"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            {active + 1} / {safeImages.length}
          </div>
        </div>
      )}
    </>
  );
}