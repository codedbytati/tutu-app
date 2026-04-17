/**
 * Standardized money utility for consistent handling across the app
 * Uses: . for decimals (standard for storage and calculations)
 * Display format: uses locale-specific formatting (pt-BR)
 */

/**
 * Parse money string to number, handling both . and , as decimal separators
 * Converts to standard format (. for decimals)
 * @example parseMoneyToNumber("1.000,50") => 1000.5
 * @example parseMoneyToNumber("1000.50") => 1000.5
 */
export const parseMoneyToNumber = (value: string): number => {
  if (!value) return 0;
  
  // Remove spaces
  let cleaned = value.trim();
  
  // If it has both comma and dot, determine which is thousands separator
  if (cleaned.includes(",") && cleaned.includes(".")) {
    // If comma is last and dot is before: "1.000,50" format
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      cleaned = cleaned.replace(/\./g, "").replace(",", ".");
    } else {
      // If dot is last: "1,000.50" format
      cleaned = cleaned.replace(/,/g, "");
    }
  } else if (cleaned.includes(",")) {
    // Only comma: could be "1000,50" or "1,50"
    cleaned = cleaned.replace(",", ".");
  }
  
  return Number(cleaned) || 0;
};

/**
 * Format number to display string with pt-BR locale
 * @example formatMoneyForDisplay(1000.5) => "R$ 1.000,50"
 */
export const formatMoneyForDisplay = (value: number | string): string => {
  const num = typeof value === "string" ? parseMoneyToNumber(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);
};

/**
 * Format number as internal storage format with . as decimal
 * @example formatMoneyForStorage(1000.5) => "1000.50"
 */
export const formatMoneyForStorage = (value: number | string): string => {
  const num = typeof value === "string" ? parseMoneyToNumber(value) : value;
  return num.toFixed(2);
};

/**
 * Format number without currency symbol for input fields
 * @example formatMoneyForInput(1000.5) => "1.000,50"
 */
export const formatMoneyForInput = (value: number | string): string => {
  const num = typeof value === "string" ? parseMoneyToNumber(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
