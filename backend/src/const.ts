export const ERROR_MESSAGES = {
  USER_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  TRAIN_NOT_FOUND: 'Train not found',
  REGISTRATION_FAILED: 'Registration failed',
  LOGIN_FAILED: 'Login failed',
} as const;

export const SUCCESS_MESSAGES = {
  TRAIN_DELETED: 'Train deleted successfully',
  USER_REGISTERED: 'User registered successfully',
} as const;
