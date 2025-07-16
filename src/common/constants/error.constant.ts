export enum ErrorCode {
  INVALID_ACCESS_TOKEN = 'Invalid access token.',
  UNAUTHORIZED = 'Unauthorized.',
  TOKEN_EXPIRED = 'Token expired.',
  INVALID_REFRESH_TOKEN = 'Invalid refresh token.',
  USER_NOT_FOUND = 'User not found.',
  INVALID_PASSWORD = 'Invalid password.',
  INACTIVE_USER = 'Inactive user.',
  EMAIL_HAS_BEEN_USED = 'Email has been registered.',
  EMAIL_IS_NOT_IN_WHITELIST = 'Email is not in whitelist.',
  EMAIL_TEMPLATE_NOT_FOUND = 'Email template not found.',
  INVALID_OTP = 'Invalid OTP.',
  ACCOUNT_HAS_NOT_KYC = 'You need KYC before using.',
}
