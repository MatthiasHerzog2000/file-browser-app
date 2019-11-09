export default class DateParser {
  public static parseDateToString(date: Date) {
    return ` ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} um ${date.getHours()}:${date.getMinutes()}`;
  }
}
