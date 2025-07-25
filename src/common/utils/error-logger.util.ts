import { ErrorLoggerMessage } from '@common/constants/error-logger.constant';

export function formatErrorMessage(
  message: string,
  params: Record<string, string | number> = {},
): string {
  let formattedMessage = message;

  Object.entries(params).forEach(([key, value]) => {
    formattedMessage = formattedMessage.replace(`{${key}}`, String(value));
  });

  return formattedMessage;
}

export function getErrorMessage(
  key: keyof typeof ErrorLoggerMessage,
  params: Record<string, string | number> = {},
): string {
  const message = ErrorLoggerMessage[key];
  return formatErrorMessage(message, params);
}
