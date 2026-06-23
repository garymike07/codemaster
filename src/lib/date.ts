const RELATIVE_DATE_FORMATTER = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

function getRelativeUnit(seconds: number): { unit: Intl.RelativeTimeFormatUnit; value: number } {
  const absSeconds = Math.abs(seconds);

  if (absSeconds < 60) return { unit: 'second', value: Math.round(seconds) };
  if (absSeconds < 60 * 60) return { unit: 'minute', value: Math.round(seconds / 60) };
  if (absSeconds < 60 * 60 * 24) return { unit: 'hour', value: Math.round(seconds / 3600) };
  if (absSeconds < 60 * 60 * 24 * 30) return { unit: 'day', value: Math.round(seconds / 86400) };
  if (absSeconds < 60 * 60 * 24 * 365)
    return { unit: 'month', value: Math.round(seconds / (86400 * 30)) };

  return { unit: 'year', value: Math.round(seconds / (86400 * 365)) };
}

export function formatDate(value: Date | number | string, locale = 'en-US') {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
}

export function formatDateTime(value: Date | number | string, locale = 'en-US') {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function formatRelativeTime(value: Date | number | string) {
  const date = value instanceof Date ? value : new Date(value);
  const diffInSeconds = (date.getTime() - Date.now()) / 1000;
  const { unit, value: relativeValue } = getRelativeUnit(diffInSeconds);
  return RELATIVE_DATE_FORMATTER.format(relativeValue, unit);
}
