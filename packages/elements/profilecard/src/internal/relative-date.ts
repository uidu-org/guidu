import { differenceInMonths, isThisMonth, isThisWeek, isValid } from 'date-fns';

export function isValidDate(date, today = new Date()) {
  return !!date.getTime && isValid(date) && date.getTime() <= today.getTime();
}
export default function getRelativeDateKey(date, today = new Date()) {
  if (!date || !isValidDate(date, today)) {
    return null;
  }
  if (isThisWeek(date)) {
    return 'ThisWeek';
  }
  if (isThisMonth(date)) {
    return 'ThisMonth';
  }
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() - 1
  ) {
    return 'LastMonth';
  }
  const diffInMonths = differenceInMonths(today, date);
  if (diffInMonths < 6) {
    return 'AFewMonths';
  }
  if (diffInMonths <= 12) {
    return 'SeveralMonths';
  }
  return 'MoreThanAYear';
}
//# sourceMappingURL=relative-date.js.map
