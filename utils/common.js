import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'
import sumBy from 'lodash/sumBy'
import max from 'lodash/max'
import min from 'lodash/min'

export const computeImageUrl = (image) => {
  if (!image) {
    return '';
  }
  return `${process.env.BASE_URL}/storage/${image}`
}

export const computePrice = (product) => {

  //if product is not null and variations is not empty

  if (!product || !product.variations.length) {
    return [0, 0, 0, 0];
  }

  //check if it has promotional prices

  let prices = product.variations.map(variation => variation.price);

  const minPrice = min(prices);
  const maxPrice = max(prices);
  let oldPrices = product.variations.map(variation => variation.old_price ?? 0);
  const minOldPrice = min(oldPrices);
  const maxOldPrice = max(oldPrices);

  return [minPrice, maxPrice, minOldPrice, maxOldPrice];
}

export const computeVariantPrice = (variant, product) => {
  if (!variant) {
    return 0;
  }
  return variant.price;
}
