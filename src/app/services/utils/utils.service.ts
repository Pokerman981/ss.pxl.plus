import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getFormattedDateWithObj(dateObject: Date) {
    // current date

    // adjust 0 before single digit date
    const date = (('0' + (dateObject.getDate())).slice(-2));
    // current month
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    // current year
    const year = dateObject.getFullYear();
    // current hours
    const hours = dateObject.getHours();
    // current minutes
    const minutes = dateObject.getMinutes();
    // current seconds
    const seconds = dateObject.getSeconds();

    return `${year}-${month}-${date}`;
  }

  public getTimeStamp(date) {
    const finalDate =  date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' +
      ('00' + date.getUTCHours()).slice(-2) + ':' +
      ('00' + date.getUTCMinutes()).slice(-2) + ':' +
      ('00' + date.getUTCSeconds()).slice(-2);
    return finalDate;
  }

  public dateMinusDayOrNum(offset?: number | null) {
    if (isNaN(offset)) { offset = 1; }
    const current = new Date();

    const dayInMS = offset * 86400000;
    return new Date(current.getTime() - (Math.abs(dayInMS)));
  }
}
