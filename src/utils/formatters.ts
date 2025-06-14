/**
 * Format a price value to a currency string
 * @param price - The price to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param currency - The currency code (default: 'USD')
 * @returns Formatted price string
 */
export const formatPrice = (
  price: number,
  locale: string = "en-US",
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Calculate and format the price with discount
 * @param price - The original price
 * @param discount - The discount percentage
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param currency - The currency code (default: 'USD')
 * @returns Object containing the discounted price and formatted strings
 */
export const calculateDiscountedPrice = (
  price: number,
  discount?: number,
  locale: string = "en-US",
  currency: string = "USD"
) => {
  if (!discount) {
    return {
      original: price,
      discounted: price,
      originalFormatted: formatPrice(price, locale, currency),
      discountedFormatted: formatPrice(price, locale, currency),
      isDiscounted: false,
      discountAmount: 0,
      discountPercentage: 0,
    };
  }

  const discountedPrice = price - price * (discount / 100);

  return {
    original: price,
    discounted: discountedPrice,
    originalFormatted: formatPrice(price, locale, currency),
    discountedFormatted: formatPrice(discountedPrice, locale, currency),
    isDiscounted: true,
    discountAmount: price - discountedPrice,
    discountPercentage: discount,
  };
};

/**
 * Format a date string to a localized date
 * @param dateString - The date string to format
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param options - Intl.DateTimeFormatOptions (optional)
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  locale: string = "en-US",
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, options).format(date);
};

/**
 * Calculate time ago from a date string
 * @param dateString - The date string to calculate from
 * @returns String representation of time ago (e.g., "2 days ago")
 */
export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }

  return seconds < 10 ? "just now" : `${Math.floor(seconds)} seconds ago`;
};

/**
 * Truncate a text string to a specific length
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the text
 * @param suffix - Suffix to add at the end (default: '...')
 * @returns Truncated text string
 */
export const truncateText = (
  text: string,
  maxLength: number,
  suffix: string = "..."
): string => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength).trim() + suffix;
};

/**
 * Generate random string for keys
 * @param length - Length of the random string (default: 8)
 * @returns Random string
 */
export const generateRandomId = (length: number = 8): string => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};

/**
 * Format a phone number to a readable format
 * @param phone - The phone number to format
 * @returns Formatted phone number
 */
export const formatPhone = (phone: string): string => {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // Format according to length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(
      4,
      7
    )}-${cleaned.slice(7)}`;
  }

  // Return original if can't format
  return phone;
};

/**
 * Get initials from a name
 * @param name - The full name
 * @param maxLength - Maximum length of initials (default: 2)
 * @returns Initials string
 */
export const getInitials = (name: string, maxLength: number = 2): string => {
  if (!name) return "";

  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, maxLength)
    .join("");
};

/**
 * Format file size in bytes to human-readable format
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted size string
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
};
