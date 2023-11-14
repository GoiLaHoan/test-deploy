import Image, { ImageProps } from "next/image";
import React, { FC, useState } from "react";

const ImageWithFallback: FC<ImageProps> = (props) => {
  const fallbackSrc = "/logo_kitco.png";
  const { src, ...rest } = props;

  const [imgSrc, setImgSrc] = useState(src ?? fallbackSrc);

  return (
    <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />
  );
};

export default ImageWithFallback;

export const ImageArticleWithFallback: FC<ImageProps> = (props) => {
  const fallbackSrc = "/fallbacks/ktc_img_fallback_md.jpg";
  const { src, ...rest } = props;

  const [imgSrc, setImgSrc] = useState(src ?? fallbackSrc);

  return (
    <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />
  );
};
