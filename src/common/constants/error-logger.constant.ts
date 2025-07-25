export const ErrorLoggerMessage = {
  LOGIN_FAILED: 'Login failed.',
  REGISTRATION_FAILED: 'Registration failed.',
  TOKEN_REFRESH_FAILED: 'Token refresh failed.',
  SEND_OTP_FAILED: 'Send OTP failed.',
  OTP_VERIFICATION_FAILED: 'OTP verification failed.',

  FIND_ALL_USERS_FAILED: 'Find all users failed.',
  GET_USER_PROFILE_FAILED: 'Get user profile failed.',
  FIND_USER_BY_ID_FAILED: 'Find user by id failed: {id}.',
  UPDATE_USER_PROFILE_FAILED: 'Update user profile failed.',
  UPDATE_USER_FAILED: 'Update user failed: {id}.',
  DELETE_USER_FAILED: 'Delete user failed: {id}.',

  CREATE_PROJECT_FAILED: 'Create project failed.',
  GET_INVESTOR_PROJECTS_FAILED: 'Get investor projects failed.',
  UPDATE_PROJECT_FAILED: 'Update project failed: {id}.',
  GET_PROJECT_DETAIL_FAILED: 'Get project detail failed: {id}.',
  DELETE_PROJECT_FAILED: 'Delete project failed: {id}.',

  REVIEW_PROJECT_FEEDBACK_FAILED: 'Review project feedback failed.',
  FIND_ALL_PROJECTS_LEGAL_REVIEW_FAILED:
    'Find all projects for legal review failed.',

  UPLOAD_USER_DOCUMENT_FAILED: 'Upload user document failed.',
  GET_USER_DOCUMENTS_FAILED: 'Get user documents failed.',
  VERIFY_USER_DOCUMENT_FAILED: 'Verify user document failed: {id}.',
  GET_LIST_USER_DOCUMENTS_FAILED: 'Get list user documents failed.',

  GET_PROJECT_DOCUMENT_FAILED: 'Get project document failed.',
  VERIFY_PROJECT_DOCUMENT_FAILED: 'Verify project document failed: {id}.',
  VERIFY_MULTIPLE_PROJECT_DOCUMENTS_FAILED:
    'Verify multiple project documents failed.',

  ADD_EMAIL_TO_WHITELIST_FAILED: 'Add email to whitelist failed.',
  REMOVE_EMAIL_FROM_WHITELIST_FAILED: 'Remove email from whitelist failed.',

  CHECKOUT_FAILED: 'Checkout failed.',
  WEBHOOK_PROCESSING_FAILED: 'Webhook processing failed.',

  FILE_UPLOAD_FAILED: 'File upload failed.',

  SEND_OTP_EMAIL_FAILED: 'Failed to send OTP email to {email}.',

  GET_PAYPAL_ACCESS_TOKEN_FAILED: 'Failed to get PayPal access token.',
  CREATE_PAYPAL_ORDER_FAILED: 'Failed to create PayPal order.',
  NO_APPROVE_LINK_FOUND: 'No approve link found in PayPal response.',

  HTTP_GET_REQUEST_FAILED: 'HTTP GET request failed: {message}.',
  HTTP_POST_REQUEST_FAILED: 'HTTP POST request failed: {message}.',

  OPERATION_FAILED: 'Operation failed.',
  VALIDATION_FAILED: 'Validation failed.',
  DATABASE_OPERATION_FAILED: 'Database operation failed.',
} as const;

export type ErrorLoggerMessageKey = keyof typeof ErrorLoggerMessage;
