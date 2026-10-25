import type { StaticImageData } from "next/image";
import type { PlanId, ProductId } from "@/config/pricing";
import serum from "@/public/images/serum.jpg";
import shampoo from "@/public/images/shampoo.jpg";
import conditioner from "@/public/images/conditioner.jpg";
import trio from "@/public/images/trio.jpg";
import trialKit from "@/public/images/trial-kit.jpg";
import gifts from "@/public/images/gifts.jpg";

/** The photo used for each product and plan in the shop and the cart. */
export const itemImages: Record<ProductId | PlanId, { src: StaticImageData; alt: string }> = {
  serum: { src: serum, alt: "velle scalp serum dropper bottle" },
  shampoo: { src: shampoo, alt: "velle hydrating shampoo pump bottle" },
  conditioner: { src: conditioner, alt: "velle nourishing conditioner tube" },
  "trial-kit": { src: trialKit, alt: "velle trial kit: mini serum, shampoo and conditioner in a satin-lined box" },
  ritual: { src: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner" },
  "glow-journey": { src: gifts, alt: "silk pillowcase, satin scrunchie and scalp massager in blush pink" },
  "full-set": { src: trio, alt: "full-size velle scalp serum, hydrating shampoo and nourishing conditioner" },
};
