class NumberFormatter {
  static leftPad(number, size = 2) {
    return String(number).padStart(size, '0');
  }
}

  // Расширение встроенного объекта Date новыми методами
export class EnhancedDate extends Date {
  getISOTimezoneOffset() {
    const offset = super.getTimezoneOffset();
    return (offset < 0 ? "+" : "-") + NumberFormatter.leftPad(Math.floor(Math.abs(offset / 60))) + ":" + NumberFormatter.leftPad(Math.abs(offset % 60));
  }

  toISOLocaleString() {
    return `${super.getFullYear()}-${NumberFormatter.leftPad(super.getMonth() + 1)}-${NumberFormatter.leftPad(super.getDate())}T${NumberFormatter.leftPad(super.getHours())}:${NumberFormatter.leftPad(super.getMinutes())}:${NumberFormatter.leftPad(super.getSeconds())}.${NumberFormatter.leftPad(super.getMilliseconds(), 3)}`;
  }
}
