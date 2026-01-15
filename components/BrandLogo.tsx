"use client";

import Image from "next/image";
import { useState } from "react";

type BrandLogoProps = {
  src: string;
  alt: string;
  fallbackText: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function BrandLogo({
  src,
  alt,
  fallbackText,
  width = 160,
  height = 60,
  className
}: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-600 ${className ?? ""}`}
        style={{ width, height }}
        aria-label={alt}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
