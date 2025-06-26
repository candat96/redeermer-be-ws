import { AppConstants } from '@common/constants/app.constant';
import moment from 'moment-timezone';

export function getCurrentVietnamTimeZone(): Date {
  return moment().tz(AppConstants.VIETNAM_TIMEZONE).toDate();
}

export function toArray(value: any) {
  if (Array.isArray(value)) return value;
  return [value];
}

export function toBoolean(data: string): boolean {
  const value = { true: true, false: false };
  return value[data];
}
