import { useDolar } from "@/contexts/DolarContext";

export function usePriceFormatter() {
  const { convertToUSD, oficialRate, showInUSD } = useDolar();

  const formatPrice = (amount: number, currency: "VES" | "USD" = "VES"): string => {
    if (showInUSD && currency === "VES") {
      const usdAmount = convertToUSD(amount);
      return `$${usdAmount.toFixed(2)} USD`;
    }
    return `Bs. ${amount.toFixed(2)}`;
  };

  const getCurrentRate = (): number | null => {
    return oficialRate;
  };

  return {
    formatPrice,
    getCurrentRate,
    convertToUSD,
    showInUSD,
  };
}
