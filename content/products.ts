import type { StaticImageData } from "next/image";
import type { ProductId } from "@/config/pricing";
import serumImg from "@/public/images/serum.jpg";
import shampooImg from "@/public/images/shampoo.jpg";
import conditionerImg from "@/public/images/conditioner.jpg";

/**
 * Product descriptions. Cosmetic language only: we describe how hair and
 * scalp look and feel, never claims about growth, hair loss or treatment.
 */
export const productDetails: Record<
  ProductId,
  {
    short: string;
    description: string;
    image: StaticImageData;
    imageAlt: string;
    keyIngredients: { name: string; why: string }[];
    howToUse: string[];
    feel: string;
  }
> = {
  serum: {
    short: "cooling tingle, wakes up the scalp for fuller-looking hair.",
    description:
      "a lightweight, non-greasy scalp serum with a fresh cooling tingle. it leaves your scalp feeling clean, soothed and awake, and your roots looking fuller and lifted.",
    image: serumImg,
    imageAlt: "velle scalp serum dropper bottle on a sand-colored stone",
    keyIngredients: [
      { name: "rosemary", why: "an herbal classic for a refreshed, healthier-feeling scalp" },
      { name: "peppermint", why: "that signature cooling tingle" },
      { name: "caffeine", why: "a wake-up call for roots that look fuller and lifted" },
      { name: "castor oil", why: "conditions the scalp so it feels soft, not tight" },
    ],
    howToUse: [
      "part dry or damp hair into sections.",
      "add a few drops along each part, right onto the scalp.",
      "massage in with your fingertips for 1–2 minutes. enjoy the tingle.",
      "leave it in. use daily, morning or night.",
    ],
    feel: "cooling tingle",
  },
  shampoo: {
    short: "fermented rice water for a gentle, sulfate-free cleanse.",
    description:
      "a creamy, sulfate-free shampoo that cleans without stripping. hair feels soft, bouncy and hydrated, and your scalp feels fresh, never squeaky.",
    image: shampooImg,
    imageAlt: "velle hydrating shampoo pump bottle on a sand-colored stone",
    keyIngredients: [
      { name: "fermented rice water", why: "for soft, smooth, shiny-looking strands" },
      { name: "aloe", why: "hydrates and leaves the scalp feeling calm" },
      { name: "tea tree", why: "a fresh, clean-feeling scalp" },
    ],
    howToUse: [
      "wet hair well.",
      "massage a coin-sized amount into your scalp.",
      "let the lather run through your lengths, then rinse.",
      "follow with the nourishing conditioner.",
    ],
    feel: "soft, fresh clean",
  },
  conditioner: {
    short: "silky slip, less breakage, glossy finish.",
    description:
      "a rich, silky conditioner with serious slip. it detangles in seconds, helps reduce breakage from brushing and leaves a glossy, touchable finish.",
    image: conditionerImg,
    imageAlt: "velle nourishing conditioner tube beside a swirl of creamy conditioner",
    keyIngredients: [
      { name: "argan oil", why: "softness and visible shine" },
      { name: "camellia oil", why: "a lightweight, glossy finish" },
      { name: "biotin", why: "conditions strands so they feel stronger and look healthier" },
    ],
    howToUse: [
      "after shampooing, squeeze out excess water.",
      "smooth through mid-lengths to ends.",
      "comb through with your fingers and leave on for 2–3 minutes.",
      "rinse with cool water for extra shine.",
    ],
    feel: "silky slip",
  },
};

export const freeFrom = ["sulfate-free", "paraben-free", "silicone-free", "vegan", "cruelty-free"];
