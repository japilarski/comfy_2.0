export const formatPrice = (priceInCents: string | number) => {
  return ((priceInCents as number) / 100).toFixed(2);
};
