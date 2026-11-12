import React from 'react';

const OptimizedImage = ({ srcWebp, srcFallback, alt, className, ...props }) => {
  return (
    <picture className="contents">
      {/* If the browser supports WebP, it loads, handles, and caches this source */}
      <source srcSet={srcWebp} type="image/webp" />

      {/* Fallback for older browsers (e.g., handles the PNG/JPG) */}
      <img
        src={srcFallback}
        alt={alt}
        className={className}
        loading="lazy" // Enables native browser lazy-loading
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;