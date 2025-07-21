// utils/date.utils.ts
export class DateUtils {
  /**
   * Converts a Date object or string to YYYY-MM-DD format
   * @param date Date object or string
   * @returns Date string in YYYY-MM-DD format
   */
  static toDateString(date: Date | string): string {
    return typeof date === 'string' ? date : date.toISOString().split('T')[0];
  }

  /**
   * Converts a Date to YYYY-MM-DD format or returns undefined if not provided
   * @param date Optional Date object
   * @returns Date string in YYYY-MM-DD format or undefined
   */
  static toOptionalDateString(date?: Date): string | undefined {
    return date ? date.toISOString().split('T')[0] : undefined;
  }

  /**
   * Creates date params object for API calls
   * @param date Optional Date object
   * @param paramName Name of the date parameter (default: 'Date')
   * @returns Record with date parameter or empty object
   */
  static createDateParams(
    date?: Date,
    paramName: string = 'Date'
  ): Record<string, string> {
    return date ? { [paramName]: date.toISOString().split('T')[0] } : {};
  }
}
