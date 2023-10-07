"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrencies, extractPrice } from "../utils";

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

    const currency = extractCurrencies(
        $('.a-price-symbol'),
    );

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"");

    // Cunstruction of Data Object for scraped info 
  } catch (error: any) {
    throw new Error(`Failed to scape product: ${error.message}`);
  }
}


// https://gist.github.com/adrianhajdin/686326bc20e24810128637a9053c49a0/