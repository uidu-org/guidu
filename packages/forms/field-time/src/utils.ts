import {
  addMinutes,
  isBefore,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';

export const generateTimeSlots = ({
  start,
  end,
  interval,
  timeFormat,
}: {
  start: number;
  end: number;
  interval: number;
  timeFormat: string;
}): string[] => {
  const setTime = (x: Date, h = 0, m = 0, s = 0, ms = 0): Date =>
    setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h);

  const from = setTime(new Date(), start);
  const to = setTime(new Date(), end);
  const step = (x: Date): Date => addMinutes(x, interval);

  const blocks = [];

  let cursor = from;

  while (isBefore(cursor, to)) {
    blocks.push(cursor);
    cursor = step(cursor);
  }

  return blocks;
};

export default generateTimeSlots;
