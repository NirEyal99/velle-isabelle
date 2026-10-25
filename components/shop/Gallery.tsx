"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

/** Big photo with small thumbnails underneath to switch between them. */
export function Gallery({ images }: { images: { src: StaticImageData; alt: string }[] }) {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-oat">
        <Image src={images[current].src} alt={images[current].alt} fill priority placeholder="blur" sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-3" aria-label="more photos">
        {images.map((img, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-pressed={i === current}
              aria-label={`show photo ${i + 1}: ${img.alt}`}
              className="relative block aspect-square w-full overflow-hidden rounded-2xl ring-cocoa ring-offset-2 ring-offset-cream aria-pressed:ring-2"
            >
              <Image src={img.src} alt="" fill sizes="(min-width: 768px) 15vw, 30vw" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
