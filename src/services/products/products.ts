import { defaultProducts } from "./products.defaults";
import { grossProfit, grossMargin } from "./products.engine";
import { productHealth } from "./products.health";

export function getProducts() {
  return defaultProducts.map((product) => ({
    ...product,

    grossProfit: grossProfit(product),

    grossMargin: grossMargin(product),

    warnings: productHealth(product),
  }));
}

export function getProduct(id: string) {
  const product = defaultProducts.find((p) => p.id === id);

  if (!product) return undefined;

  return {
    ...product,

    grossProfit: grossProfit(product),

    grossMargin: grossMargin(product),

    warnings: productHealth(product),
  };
}