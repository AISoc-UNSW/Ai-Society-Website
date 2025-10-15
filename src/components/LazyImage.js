import React, { useEffect, useRef, useState } from "react";

/**
 * LazyImage lazily loads the image when it enters the viewport.
 * It renders a solid color placeholder first, then fades the image in once loaded.
 */
const LazyImage = ({
  src,
  alt,
  width,
  height,
  style,
  className,
  placeholderColor = "#e0e0e0",
  objectFit = "cover",
  onLoad,
}) => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const wrapperStyles = {
    position: "relative",
    width: width || "100%",
    height: height || "100%",
    overflow: "hidden",
    backgroundColor: placeholderColor,
  };

  const imgStyles = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit,
    transition: "opacity 400ms ease",
    opacity: isLoaded ? 1 : 0,
    display: "block",
    ...style,
  };

  return (
    <div ref={containerRef} style={wrapperStyles} className={className}>
      {isInView && (
        <img src={src} alt={alt} onLoad={handleLoad} style={imgStyles} />
      )}
    </div>
  );
};

export default LazyImage;


