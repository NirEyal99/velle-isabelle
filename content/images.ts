import type { StaticImageData } from "next/image";
import type { PlanId, ProductId } from "@/config/pricing";
import serum from "@/public/images/serum.jpg";
import shampoo from "@/public/images/shampoo.jpg";
import conditioner from "@/public/images/conditioner.jpg";
import trio from "@/public/images/trio.jpg";
import trialKit from "@/public/images/trial-kit.jpg";
import gifts from "@/public/images/gifts.jpg";

/**
 * The photo used for each product and plan in the shop and the cart.
 * `focus` is the part of the photo to keep in view when it is cropped (e.g. "50% 46%"),
 * chosen so the full bottles, including pump and dropper tops, always show.
 */
export const itemImages: Record<ProductId | PlanId, { src: StaticImageData; alt: string; focus?: string }> = {
  serum: { src: serum, alt: "velle scalp serum dropper bottle" },
  shampoo: { src: shampoo, alt: "velle hydrating shampoo pump bottle" },
  conditioner: { src: conditioner, alt: "velle nourishing conditioner tube" },
  "trial-kit": { src: trialKit, alt: "velle trial kit: mini serum, shampoo and conditioner in a satin-lined box", focus: "50% 40%" },
  ritual: { src: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner", focus: "50% 46%" },
  "glow-journey": { src: gifts, alt: "silk pillowcase, satin scrunchie and scalp massager in blush pink", focus: "50% 70%" },
  "full-set": { src: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner", focus: "50% 46%" },
};
