const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
];

export default class DateParser {
  public static parseDateToString(date: Date) {
    return ` ${("0" + date.getDate().toString()).slice(-2)}.${(
      "0" + date.getMonth().toString()
    ).slice(-2)}.${date.getFullYear()} um ${(
      "0" + date.getHours().toString()
    ).slice(-2)}:${("0" + date.getMinutes().toString()).slice(-2)}`;
  }
  public static parseDateToDateString(date: Date) {
    return ` ${date.getDate()}. ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  }
}
