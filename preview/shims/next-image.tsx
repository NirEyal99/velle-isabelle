/* eslint-disable @next/next/no-img-element */

type ImageData = { src: string; width: number; height: number };
type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | ImageData;
  fill?: boolean;
  priority?: boolean;
  placeholder?: string;
  sizes?: string;
};

/** Stand-in for next/image in the preview: a plain image with the same layout behaviour. */
export default function Image({ src, fill, priority, placeholder: _placeholder, sizes: _sizes, style, alt, ...rest }: Props) {
  const data = typeof src === "string" ? { src, width: undefined, height: undefined } : src;
  return (
    <img
      src={data.src}
      alt={alt}
      width={fill ? undefined : data.width}
      height={fill ? undefined : data.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
      {...rest}
    />
  );
}

export type StaticImageData = ImageData;
