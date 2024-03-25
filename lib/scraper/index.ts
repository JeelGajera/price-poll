"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scarapeAmazonProduct(url: string) {
  if (!url) return;

  //BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (80107080 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(
        ".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay span.a-offscreen"
      ),
      $(".a-price.a-text-price.a-size-medium.apexPriceToPay span.a-offscreen"),
      $(
        ".a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay span.a-price-whole"
      )
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock = $('#availability span').text().trim().toLowerCase() === 'Currently unavailable';

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || "";

    const imageUrl = Object.keys(JSON.parse(images));

    const currency = extractCurrency(
        $('.a-price-symbol'),
    );

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");

    const description = extractDescription($)

    // Cunstruction of Data Object for scraped info 
    const data = {
      url,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      discountRate: Number(discountRate),
      currency: currency || '₹',
      image: imageUrl[0],
      isOutOfStock: outOfStock,
      priceHistory: [],
      category: 'electronics',
      reviewsCount: 100,
      starts: 4.3,
      description: description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      heighestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }
    
    return data;
  } catch (error: any) {
    throw new Error(`Failed to scape product: ${error.message}`);
  }
}


// https://gist.github.com/adrianhajdin/686326bc20e24810128637a9053c49a0/