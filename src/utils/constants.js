// Application constants
export const APP_CONSTANTS = {
  VERSION: '1.0.0-alpha',
  DEFAULT_THEME: 'light',
  SUPPORTED_THEMES: ['light', 'dark', 'high-contrast'],
  API_ENDPOINTS: {
    BASE: 'https://api.ynor.dev/v1',
    USERS: '/users',
    AUTH: '/auth'
  },
  VALIDATION_RULES: {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: {
      MIN_LENGTH: 8,
      REQUIREMENTS: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }
  },
  ERROR_MESSAGES: {
    NETWORK: 'Network error occurred. Please try again.',
    AUTH: 'Authentication failed. Please check your credentials.'
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ynor_auth_token',
  USER_PREFERENCES: 'ynor_user_prefs'
};

// Event names
export const EVENTS = {
  THEME_CHANGED: 'theme:changed',
  AUTH_STATE_CHANGED: 'auth:state-changed'
};