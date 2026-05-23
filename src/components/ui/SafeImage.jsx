"use client";

import { fallbackImage } from "@/data/site";

/**
 * Image avec repli automatique si la source est indisponible.
 */
export default function SafeImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  ...imageProps
}) {
  return (
    <img
      src={src || fallbackImage}
      alt={alt || ""}
      className={className}
      loading={loading}
      {...imageProps}
      onError={(event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = fallbackImage;
      }}
    />
  );
}
