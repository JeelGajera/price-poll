"use server";

import { revalidatePath } from "next/cache";
import { scarapeAmazonProduct } from "@/lib/scraper";
import { connectToDB } from "../mongoose";
import Product from "../models/product.model";
import { getHighestPrice, getLowestPrice, getAveragePrice } from "../utils";

export async function scarapeAndStoreProduct(productUrl: string) {
  if (!productUrl) {
    throw new Error("Product URL is required");
  }

  try {
    connectToDB();
    const scarapedProduct = await scarapeAmazonProduct(productUrl);
    if (!scarapedProduct) return;

    let product = scarapedProduct;
    const existingProduct = await Product.findOne({ url: scarapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scarapedProduct.currentPrice },
      ];

      product = {
        ...scarapedProduct,
        priceHistory: updatedPriceHistory,
        heighestPrice: getHighestPrice(updatedPriceHistory),
        lowestPrice: getLowestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      {
        url: scarapedProduct.url,
      },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await Product.findOne({ _id: productId });
    if (!product)  return;
    return product;
  } catch (error: any) {
    throw new Error(`Failed to get product: ${error.message}`);
  }
}

export const getAllProducts = () => {
  try {
    connectToDB();
    const products = Product.find();
    return products;
  } catch (error: any) {
    throw new Error(`Failed to get products: ${error.message}`);
  }
}