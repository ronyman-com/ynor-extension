import { APP_CONSTANTS, STORAGE_KEYS } from './constants';

/**
 * Format date to localized string
 * @param {Date|string} date 
 * @param {string} locale 
 * @returns {string}
 */
export const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  return APP_CONSTANTS.VALIDATION_RULES.EMAIL.test(email);
};

/**
 * Password strength checker
 * @param {string} password 
 * @returns {object}
 */
export const checkPasswordStrength = (password) => {
  const rules = APP_CONSTANTS.VALIDATION_RULES.PASSWORD;
  return {
    isValid: password.length >= rules.MIN_LENGTH && rules.REQUIREMENTS.test(password),
    strength: password.length < rules.MIN_LENGTH ? 'weak' : 
      rules.REQUIREMENTS.test(password) ? 'strong' : 'medium'
  };
};

/**
 * Safe localStorage access
 * @param {string} key 
 * @param {any} defaultValue 
 * @returns {any}
 */
export const getStorageItem = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (error) {
    console.error('Storage access error:', error);
    return defaultValue;
  }
};

/**
 * Generate unique ID
 * @param {number} length 
 * @returns {string}
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Debounce function execution
 * @param {Function} fn 
 * @param {number} delay 
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};