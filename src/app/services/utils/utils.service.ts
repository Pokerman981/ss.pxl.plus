import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public getFormattedDate(dateOffset) {
    // current date
    const dateObject = new Date();
    let tempDate = dateObject.getDate();
    let tempMonth = dateObject.getMonth();

    if (dateOffset >= tempDate) {
      tempMonth--;
      tempDate = dateOffset - daysInMonth(tempMonth, dateObject.getFullYear());
    } else {
      tempDate -= dateOffset;
    }

    // adjust 0 before single digit date
    const date = (('0' + (tempDate)).slice(-2));
    // current month
    const month = ('0' + (tempMonth + 1)).slice(-2);
    // current year
    const year = dateObject.getFullYear();
    // current hours
    const hours = dateObject.getHours();
    // current minutes
    const minutes = dateObject.getMinutes();
    // current seconds
    const seconds = dateObject.getSeconds();

    function daysInMonth(m, y) {
      return new Date(y, m, 0).getDate();
    }

    return `${year}-${month}-${date}`;
  }
}
