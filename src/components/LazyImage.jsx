import { useState, useEffect, useRef } from 'react';

export function LazyImage({ src, alt, className, aspectRatio = 'auto', disableLazy = false, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(disableLazy);
  const imgRef = useRef(null);

  useEffect(() => {
    if (disableLazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [disableLazy]);

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className || ''}`}
      style={{ aspectRatio }}
    >
      <div className={`lazy-image-placeholder ${isLoaded ? 'loaded' : ''}`}>
        <div className="lazy-image-skeleton" />
      </div>
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}
