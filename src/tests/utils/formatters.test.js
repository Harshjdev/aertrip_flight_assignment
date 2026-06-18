import {
  formatDuration,
  formatCurrency,
  toAbsoluteMinutes,
  minutesFromMidnight,
} from '../../utils/formatters';

describe('formatDuration', () => {
  it('formats hours and minutes', () => {
    expect(formatDuration(9600)).toBe('2h 40m'); // 9600s = 2h40m
  });

  it('omits minutes when zero', () => {
    expect(formatDuration(7200)).toBe('2h');
  });

  it('omits hours when under an hour', () => {
    expect(formatDuration(1800)).toBe('30m');
  });

  it('returns a placeholder for invalid input', () => {
    expect(formatDuration(undefined)).toBe('--');
    expect(formatDuration(-5)).toBe('--');
  });
});

describe('formatCurrency', () => {
  it('formats an integer amount with a rupee symbol and no decimals', () => {
    const out = formatCurrency(4564);
    expect(out).toContain('4,564');
    expect(out).toContain('₹');
    expect(out).not.toContain('.00');
  });

  it('returns a placeholder for non-numeric input', () => {
    expect(formatCurrency('abc')).toBe('--');
  });
});

describe('toAbsoluteMinutes', () => {
  it('orders a same-day late flight before a next-day early arrival', () => {
    const lateSameDay = toAbsoluteMinutes('2021-10-17', '23:15');
    const earlyNextDay = toAbsoluteMinutes('2021-10-18', '08:05');
    expect(lateSameDay).toBeLessThan(earlyNextDay);
  });

  it('falls back to minutes-from-midnight without a date', () => {
    expect(toAbsoluteMinutes('', '01:30')).toBe(90);
  });
});

describe('minutesFromMidnight', () => {
  it('converts HH:mm to minutes', () => {
    expect(minutesFromMidnight('07:05')).toBe(425);
    expect(minutesFromMidnight('00:00')).toBe(0);
  });
});
