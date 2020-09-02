/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 6/15/20, 5:34 AM
 * File: ecotracker.component.ts
 * Project: ss.pxl.plus
 */

import {Component, OnInit} from '@angular/core';
import {GoogleChartInterface} from 'ng2-google-charts';
import {UtilsService} from '../../../../services/utils/utils.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../services/auth/auth.service';
import {map, shareReplay} from 'rxjs/operators';
import {of} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-ecotracker',
  templateUrl: './ecotracker.component.html',
  styleUrls: ['./ecotracker.component.css']
})
export class EcotrackerComponent implements OnInit {
  // totals, most bought by $, most sold by $, most bought by #, most sold by #, most bought by player, most sold by player

  public availableServers = [
    'dash',
    'verse',
    'legends',
    'club',
    'brawl',
    'zone1',
    'zone2'
  ];

  public days = [
    '1 Day',
    '7 Days',
    '14 Days',
    '28 Days'
  ];

  // TODO Make this not a parallel array

  public graphDisplayNames = [
    'Totals',
    'Most Bought By Value',
    'Most Sold By Value',
    'Most Bought By Quantity',
    'Most Sold By Quantity',
    'Most Bought By Player',
    'Most Sold By Player'
  ];

  public graphNames = [
    'totals',
    'mostBoughtByValue',
    'mostSoldByValue',
    'mostBoughtByQuantity',
    'mostSoldByQuantity',
    'mostBoughtByPlayer',
    'mostSoldByPlayer'
  ];

  allData: any[] = [];
  googleChartData: any;

  date = new FormControl(this.utils.dateMinusDayOrNum());



  constructor(private utils: UtilsService, private http: HttpClient, private auth: AuthService) { }

  async ngOnInit() {
    setTimeout(() => {
      this.requestFullData(this.utils.getFormattedDateWithObj(new Date(this.date.value)));
    }, 50);
  }

  requestFullData(dateOffset) {
    this.requestServersChartData(dateOffset)
      .then(value => {
        this.formatData(value)
          .then(formattedValue => {
            this.allData = formattedValue;
            this.googleChartData = of(formattedValue);
          })
          .finally(() => {
            return true;
          });
      });
  }

  async requestServersChartData(dateOffset) {
    const allServersData: any[] = [];
    for (const server of this.availableServers) {
      await this.getChartData(server, dateOffset)
        .then(async (value) => {
          allServersData.push(value);
          // this.allData.push(value);
        })
        .catch(reason => {
          console.log(reason);
        });
    }

    return allServersData;
  }


  convertToArrayMap(data, name){
    const extractedData: Map<string, number> = new Map(data[`${name}`]);
    const arrayMap = [];
    extractedData.forEach((value, key) => {
      arrayMap.push([key, value]);
    });

    return arrayMap.sort((a, b) => b[1] - a[1]);
  }

  makeChart(type, title, data, name) {
    const arrayMap = this.convertToArrayMap(data, name);
    const chart: GoogleChartInterface = {
      chartType: type,
      dataTable: arrayMap,
      firstRowIsData: true,
      options: {
        title,
        sliceVisibilityThreshold: 10 / 500,
        pieStartAngle: 190,
        slices: {
          0: {offset: 0.11},
          1: {offset: 0.12},
          2: {offset: 0.13},
          3: {offset: 0.14},
          4: {offset: 0.15},
          5: {offset: 0.16},
          6: {offset: 0.17},
          7: {offset: 0.18},
          8: {offset: 0.19},
          9: {offset: 0.195},
          10: {offset: 0.199}
        }
      }
    };
    return chart;
  }

  async formatData(data) {
    const tempData: any[] = data;

    const formattedCondensedData = [];

    for (const server of tempData) {
      const mapArray = [];

      for (const day of server) {
        const parsed = JSON.parse(day.data);

        for (const graphType of parsed) {

          for (const graph in graphType) {

              if (mapArray[graph] === undefined) {
                mapArray[graph] = new Map(Object.entries(graphType[graph]));

              } else {

                const currentData: Map<string, number> = mapArray[graph];
                const compareData: Map<string, number> = new Map(Object.entries(graphType[graph]));

                compareData.forEach((value, key) => {

                  if (currentData.get(key) === undefined) {

                    currentData.set(key, value);

                  } else {

                    const tempCompare: number = parseFloat(compareData.get(key).toString());
                    const tempCurrent: number = parseFloat(currentData.get(key).toString());
                    currentData.set(key, (tempCurrent + tempCompare));
                  }
                });
              }
          }
        }
      }
      formattedCondensedData.push(mapArray);
    }
    return formattedCondensedData;
  }

  getChartData(server, dateOffset)  {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.APIURL}api/ecotracker`, {headers: {requestedDate: dateOffset, server, token: this.auth.getToken('token')}})
        .pipe(
          map(data => data),
          shareReplay())
        .toPromise()
        .then(value => {
          resolve(value);
        })
        .catch(reason => {
          console.log(reason);
          reject(reason);
        });
    });
  }

  dateChanged(event) {
    this.requestFullData(this.utils.getFormattedDateWithObj(new Date(event.value)));
  }

}
