/**
 * Email validation regex pattern
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Password validation regex patterns
 */
const PASSWORD_REGEX = {
  // At least 8 characters
  minLength: /.{8,}/,
  // At least one uppercase letter
  uppercase: /[A-Z]/,
  // At least one lowercase letter
  lowercase: /[a-z]/,
  // At least one digit
  digit: /\d/,
  // At least one special character
  special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
};

/**
 * Phone number validation regex (US format)
 */
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

/**
 * Credit card validation regex
 */
const CREDIT_CARD_REGEX = /^[0-9]{13,19}$/;

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with validation results
 */
export const validatePassword = (password: string) => {
  return {
    minLength: PASSWORD_REGEX.minLength.test(password),
    hasUppercase: PASSWORD_REGEX.uppercase.test(password),
    hasLowercase: PASSWORD_REGEX.lowercase.test(password),
    hasDigit: PASSWORD_REGEX.digit.test(password),
    hasSpecialChar: PASSWORD_REGEX.special.test(password),
    isValid:
      PASSWORD_REGEX.minLength.test(password) &&
      PASSWORD_REGEX.uppercase.test(password) &&
      PASSWORD_REGEX.lowercase.test(password) &&
      PASSWORD_REGEX.digit.test(password) &&
      PASSWORD_REGEX.special.test(password),
  };
};

/**
 * Validate phone number format (US)
 * @param phone - Phone number to validate
 * @returns True if valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

/**
 * Validate credit card number using Luhn algorithm
 * @param cardNumber - Credit card number to validate
 * @returns True if valid, false otherwise
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  // First check with regex for basic format
  if (!CREDIT_CARD_REGEX.test(cardNumber)) {
    return false;
  }

  // Luhn algorithm implementation
  const digits = cardNumber.split("").map(Number);
  const checkDigit = digits.pop() || 0;
  const sum = digits
    .reverse()
    .map((digit, index) => {
      if (index % 2 === 0) {
        const doubled = digit * 2;
        return doubled > 9 ? doubled - 9 : doubled;
      }
      return digit;
    })
    .reduce((acc, curr) => acc + curr, 0);

  return (sum + checkDigit) % 10 === 0;
};

/**
 * Validate if a string is empty or whitespace only
 * @param str - String to validate
 * @returns True if empty or whitespace only, false otherwise
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim() === "";
};

/**
 * Validate if a number is within a range
 * @param value - Number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if within range, false otherwise
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Validate zip code format (US)
 * @param zipCode - Zip code to validate
 * @returns True if valid, false otherwise
 */
export const isValidZipCode = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

/**
 * Validate a date is in the future
 * @param date - Date to validate
 * @returns True if in the future, false otherwise
 */
export const isFutureDate = (date: Date): boolean => {
  const now = new Date();
  return date > now;
};

/**
 * Validate a date is in the past
 * @param date - Date to validate
 * @returns True if in the past, false otherwise
 */
export const isPastDate = (date: Date): boolean => {
  const now = new Date();
  return date < now;
};

/**
 * Validate if an array has at least one item
 * @param arr - Array to validate
 * @returns True if not empty, false otherwise
 */
export const hasItems = <T>(arr: T[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Validate if a value exists (not null or undefined)
 * @param value - Value to validate
 * @returns True if exists, false otherwise
 */
export const exists = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns True if valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
