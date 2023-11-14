import clsx from "clsx";
import Image from "next/image";
import { env } from "~/src/env/client.mjs";

function loader({ src, height, width, service }) {
  // local files
  if (src.charAt(0) === "/") {
    return src;
  }
  const baseURL = `${env.NEXT_PUBLIC_IMAGES_CDN_API}/img/height_${height},width_${width}/${service}`;
  return `${baseURL}/${src}`;
}

function fallback(size: "sm" | "md" | "lg") {
  return `/fallbacks/ktc_img_fallback_${size}.jpg`;
}

export function ImageMS({
  src,
  height,
  width,
  service,
  className,
  alt,
  priority = false,
}: {
  src: string;
  height: number;
  width: number;
  service: "icms" | "vcms" | "acms";
  className?: string;
  priority?: boolean;
  alt: string;
}) {
  function isValidUrl(urlString: string): boolean {
    try {
      new URL(urlString);
      return true;
    } catch (_) {
      return false;
    }
  }

  function transformSrc() {
    if (!isValidUrl(src)) {
      return src ?? fallback("lg");
    }
    const url = new URL(src);
    const bucketPath = url?.pathname?.replace("/image/", "");
    return bucketPath;
  }

  return (
    <Image
      loader={() => loader({ src: transformSrc(), height, width, service })}
      src={transformSrc()}
      alt={alt}
      className={clsx("object-cover", className)}
      priority={priority}
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      fill={false}
      style={{ width: "100%", maxWidth: "100%" }}
      width={100}
      height={100}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = fallback("lg");
        currentTarget.srcset = fallback("md");
      }}
    />
  );
}
