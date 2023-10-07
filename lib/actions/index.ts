"use server";

import { scarapeAmazonProduct } from '@/lib/scraper'

export async function scarapeAndStoreProduct(productUrl: string) {
  if (!productUrl) {
    throw new Error("Product URL is required");
  }

  try {
    const scarapedProduct = await scarapeAmazonProduct(productUrl);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}
