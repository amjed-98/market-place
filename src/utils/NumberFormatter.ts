import type { Locale } from '../../@types/i18next';

type Value = number | bigint;
type Style = 'decimal' | 'percent' | 'currency';
type Currency = 'USD' | 'EUR';
type MaximumFractionDigits = 0 | 1 | 2 | 3 | 4 | 5;
type FormatOptions = {
  maximumFractionDigits?: MaximumFractionDigits;
  style?: Style;
  currency?: Currency;
};

export default class NumberFormatter {
  private locale: Locale;

  constructor(locale: Locale) {
    this.locale = locale;
  }

  format(value: Value, { style, currency, maximumFractionDigits = 2 }: FormatOptions = {}) {
    return new Intl.NumberFormat(this.locale, {
      currency,
      style,
      maximumFractionDigits,
    }).format(value);
  }
}
