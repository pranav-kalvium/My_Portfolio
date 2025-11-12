import React, { useEffect, useState, useRef } from "react";

function ProjectDetailPage({ project = {}, onClose }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  //lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // new: scroll state + ref for scrollable content + scroll hint
  const contentRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    // mount animation
    setMounted(true);

    const onKey = (e) => {
      // keyboard nav for lightbox when open; otherwise close modal on Escape
      if (lightboxOpen) {
        if (e.key === "Escape") {
          setLightboxOpen(false);
          return;
        }
        if (e.key === "ArrowRight") {
          setLightboxIndex((i) => (i + 1) % (project.gallery?.length || 1));
          return;
        }
        if (e.key === "ArrowLeft") {
          setLightboxIndex(
            (i) =>
              (i - 1 + (project.gallery?.length || 1)) %
              (project.gallery?.length || 1),
          );
          return;
        }
      } else {
        if (e.key === "Escape") onClose && onClose();
      }
    };
    window.addEventListener("keydown", onKey);

    // prevent body scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      setMounted(false);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, lightboxOpen, project.gallery]);

  // helpers for lightbox
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextLightbox = (e) => {
    e && e.stopPropagation();
    setLightboxIndex((i) => (i + 1) % (gallery.length || 1));
  };
  const prevLightbox = (e) => {
    e && e.stopPropagation();
    setLightboxIndex(
      (i) => (i - 1 + (gallery.length || 1)) % (gallery.length || 1),
    );
  };

  // scroll hint click: scroll the details area and hide the hint
  const handleScrollHintClick = () => {
    const el = contentRef.current;
    if (!el) return;
    // Scroll down a reasonable amount (or to bottom if less remains)
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    const amount = remaining > 480 ? 480 : remaining;
    if (amount > 0) {
      el.scrollBy({ top: amount, behavior: "smooth" });
    }
    setShowScrollHint(false);
  };

  // safe defaults
  const {
    title = "Project Title",
    banner,
    desc,
    subdesc,
    overview,
    techstack = [],
    projectOutline = [],
    gallery = [],
    links = {},
    stats = {},
    reflection,
    tags = [],
  } = project;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      const y = el.scrollTop;
      setScrolled(y > 6);
      if (y > 0) setShowScrollHint(false);
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    // keep the hint visible until the user actually scrolls
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [contentRef]);

  return (
    <>
      {/* small, local scrollbar styles for the modal */}
      <style>{`
        /* thin, subtle scrollbar for the project detail modal */
        .pd-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.16) rgba(0,0,0,0);
        }
        .pd-scroll::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .pd-scroll::-webkit-scrollbar-track {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
        }
        .pd-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.10));
          border-radius: 9px;
          border: 3px solid rgba(0,0,0,0.35);
        }
        .pd-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.14));
        }

        /* lightbox styles */
        .pd-lightbox {
          backdrop-filter: blur(6px);
        }
        .pd-lightbox .lb-btn {
          background: rgba(255,255,255,0.06);
          color: #fff;
          border-radius: 6px;
          padding: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background .15s;
        }
        .pd-lightbox .lb-btn:hover { background: rgba(255,255,255,0.10); }

        /* scroll shadow (appears at top of content area when scrolled) */
        .content-shadow {
          box-shadow: inset 0 8px 10px -10px rgba(0,0,0,0.6), inset 0 6px 14px -12px rgba(0,0,0,0.5);
        }

        /* scroll hint chevron */
        .scroll-hint {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 28px;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          color: rgba(255,255,255,0.9);
          transform-origin: center;
          animation: bounce 1400ms infinite;
          opacity: 1;
          transition: opacity .3s ease, transform .25s ease;
        }
        .scroll-hint.hidden { opacity: 0; transform: translateY(6px) scale(.98); pointer-events: none; animation: none; }

        @keyframes bounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* full-screen backdrop + container */}
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-start p-6"
        aria-modal="true"
        role="dialog"
      >
        {/* backdrop layer: slight transparency everywhere except modal content */}
        <div
          className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* content card: clicks shouldn't bubble to backdrop */}
        <div
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden transform transition-all duration-500
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            background: "rgba(0,0,0,0.75)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            // fill most of viewport but leave small padding from edges
            height: "calc(100vh - 3.5rem)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* close control (inside) */}
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 z-40 w-9 h-9 rounded-md flex items-center justify-center bg-white/6 hover:bg-white/10 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Prominent link group moved next to close (top-right) */}
          <div className="absolute top-4 right-16 z-40 flex items-center gap-2">
            {links.live && (
              <a
                href={links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - Live site`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-white/6 text-white/90 hover:bg-white/8 transition focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Live</span>
              </a>
            )}

            {links.source && (
              <a
                href={links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - Source code`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-white/6 text-white/90 hover:bg-white/8 transition focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <svg
                  width="20"
                  height="20"
                  className="mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 2C7.58 2 4 5.58 4 10c0 3.54 2.29 6.54 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C17.71 16.54 20 13.54 20 10c0-4.42-3.58-8-8-8z"
                    fill="currentColor"
                  />
                </svg>
                <span>Source</span>
              </a>
            )}

            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} - Demo video`}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-white/6 text-white/90 hover:bg-white/8 transition focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path d="M5 3v18l15-9L5 3z" fill="currentColor" />
                </svg>
                <span>Demo</span>
              </a>
            )}
          </div>

          {/* Banner / Hero (top) - large with title + brief overlay */}
          <div
            className="w-full relative overflow-hidden flex-shrink-0"
            style={{ height: "40vh", minHeight: 240 }}
          >
            {banner ? (
              <img
                src={banner}
                alt={desc || title}
                className={`w-full h-full object-cover transition-transform duration-700 ease-out
                    ${mounted ? "scale-100" : "scale-101"}`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
            )}

            {/* gradient overlay & title (only title + brief here) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent pointer-events-none" />
            <div
              className={`absolute left-6 bottom-6 right-6 text-white max-w-[90%] transition-transform duration-700
                ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                {title}
              </h3>
              {desc && (
                <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">
                  {desc}
                </p>
              )}
              {subdesc && (
                <p className="mt-1 text-xs md:text-sm text-white/70 max-w-2xl">
                  {subdesc}
                </p>
              )}
            </div>

            {/* small animated scroll hint centered at bottom of banner */}
            <div className="absolute left-0 right-0 bottom-4 flex items-center justify-center">
              <button
                onClick={handleScrollHintClick}
                aria-label="Scroll to details"
                className={`scroll-hint ${showScrollHint ? "" : "hidden"} focus:outline-none focus:ring-2 focus:ring-white/30`}
              >
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 24 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 2.5L12 11.5L22 2.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable content area below the banner */}
          <div
            ref={contentRef}
            tabIndex={0}
            aria-label={`${title} details`}
            className={`p-6 md:p-8 overflow-auto flex-1 pd-scroll transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"} ${scrolled ? "content-shadow" : ""}`}
            style={{ scrollbarGutter: "stable", outline: "none" }}
          >
            {/* Overview */}
            {overview && (
              <section className="mb-6">
                <h4 className="text-xs text-white/60 uppercase tracking-wider mb-2">
                  Overview
                </h4>
                <p className="text-white/90 leading-relaxed">{overview}</p>
              </section>
            )}

            {/* Tech Stack */}
            {techstack.length > 0 && (
              <section className="mb-6">
                <h4 className="text-xs text-white/60 uppercase tracking-wider mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techstack.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-white/6 border border-white/6 rounded-md text-white/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Tags (icons) */}
            {tags.length > 0 && (
              <section className="mb-6">
                <h4 className="text-xs text-white/60 uppercase tracking-wider mb-3">
                  Tags
                </h4>
                <div className="flex items-center gap-3 flex-wrap">
                  {tags.map((t) => (
                    <div
                      key={t.id || t.name}
                      className="flex items-center gap-2 bg-white/4 px-2 py-1 rounded-md border border-white/6"
                    >
                      {t.path && (
                        <img
                          src={t.path}
                          alt={t.name}
                          className="w-5 h-5 object-contain"
                        />
                      )}
                      <span className="text-sm text-white/90">{t.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Project Outline */}
            {projectOutline.length > 0 && (
              <section className="mb-6">
                <h4 className="text-xs text-white/60 uppercase tracking-wider mb-3">
                  Project Outline
                </h4>
                <div className="space-y-3">
                  {projectOutline.map((item, idx) => (
                    <div key={idx} className="text-white/90">
                      <p className="font-medium text-sm">{item.title}</p>
                      {Array.isArray(item.content) ? (
                        <ul className="list-disc list-inside text-sm text-white/70 mt-1 space-y-1">
                          {item.content.map((c, j) => (
                            <li key={j}>{c}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-white/70 mt-1">
                          {item.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <section className="mb-6">
                <h4 className="text-xs text-white/60 uppercase tracking-wider mb-3">
                  Gallery
                </h4>
                <div className="flex gap-3 overflow-x-auto py-1">
                  {gallery.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`screenshot-${i}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => openLightbox(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openLightbox(i);
                        }
                      }}
                      className="w-48 h-28 object-cover rounded-md border border-white/6 cursor-pointer"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Links + Stats */}
            <div className="flex flex-col lg:flex-row gap-4 items-start justify-between mt-4">
              <div className="flex flex-wrap gap-2">
                {links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/90 bg-white/6 px-3 py-1 rounded-md hover:bg-white/8 transition"
                  >
                    Live
                  </a>
                )}
                {links.source && (
                  <a
                    href={links.source}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/90 bg-white/6 px-3 py-1 rounded-md hover:bg-white/8 transition"
                  >
                    Source
                  </a>
                )}
                {links.demo && (
                  <a
                    href={links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/90 bg-white/6 px-3 py-1 rounded-md hover:bg-white/8 transition"
                  >
                    Demo
                  </a>
                )}
              </div>

              {Object.keys(stats).length > 0 && (
                <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
                  {Object.entries(stats).map(([k, v]) => (
                    <div key={k} className="flex flex-col">
                      <span className="text-xs text-white/50 uppercase">
                        {k}
                      </span>
                      <span className="font-medium text-white/90">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reflection */}
            {reflection && (
              <section className="mt-6 pb-6">
                <h4 className="text-xs text-white/60 uppercase tracking-wider mb-2">
                  Reflection
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {reflection}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && gallery.length > 0 && (
        <div
          className="pd-lightbox fixed inset-0 flex items-center justify-center p-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          style={{ zIndex: 99999 }} // ensure overlay sits above modal
        >
          <div className="absolute inset-0 bg-black/90" />

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            aria-label="Close image"
            className="lb-btn"
            style={{ position: "absolute", top: 24, right: 24, zIndex: 100000 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={(e) => prevLightbox(e)}
            aria-label="Previous image"
            className="lb-btn"
            style={{ position: "absolute", left: 24, zIndex: 100000 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <img
            src={gallery[lightboxIndex]}
            alt={`screenshot-${lightboxIndex}`}
            className="max-w-[90%] max-h-[90%] rounded-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", zIndex: 100000 }}
          />

          <button
            onClick={(e) => nextLightbox(e)}
            aria-label="Next image"
            className="lb-btn"
            style={{ position: "absolute", right: 24, zIndex: 100000 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default ProjectDetailPage;
