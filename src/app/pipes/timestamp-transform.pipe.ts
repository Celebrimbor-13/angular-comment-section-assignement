import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timestampTransform",
})
export class TimestampTransformPipe implements PipeTransform {
  transform(timestamp: string) {
    let presentTime = Date.now();
    let timestampInNumber = parseInt(timestamp);

    let msPerMinutes = 60 * 1000;
    let msPerHour = msPerMinutes * 60;
    let msPerDay = msPerHour * 24;
    let msPerWeek = msPerDay * 7;
    let msPerMonth = msPerWeek * 4;
    let msPerYear = msPerMonth * 12;

    let timeGap = presentTime - timestampInNumber;
    if (timeGap < msPerMinutes) {
      return Math.round(timeGap / 1000) + " seconds ago";
    } else if (timeGap < msPerHour) {
      return Math.round(timeGap / msPerMinutes) + " minutes ago";
    } else if (timeGap < msPerDay) {
      return Math.round(timeGap / msPerHour) + " hours ago";
    } else if (timeGap < msPerWeek) {
      return Math.round(timeGap / msPerDay) + " days ago";
    } else if (timeGap < msPerMonth) {
      return Math.round(timeGap / msPerWeek) + " weeks ago";
    } else if (timeGap < msPerYear) {
      return Math.round(timeGap / msPerMonth) + " months ago";
    } else {
      return Math.round(timeGap / msPerYear) + " years ago";
    }
  }
}
