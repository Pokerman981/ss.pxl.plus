import {Component, OnInit} from '@angular/core';
import {GoogleChartInterface} from 'ng2-google-charts';
import {UtilsService} from '../../../../services/utils/utils.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../services/auth/auth.service';
import {map, shareReplay} from 'rxjs/operators';
import {of} from 'rxjs';

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

  constructor(private utils: UtilsService, private http: HttpClient, private auth: AuthService) { }

  async ngOnInit() {
    for (const server of this.availableServers) {
      await this.getChartData(server)
        .then(async (value) => {
          this.allData.push(value);
        })
        .catch(reason => {
          console.log(reason);
        });
    }

    this.formatData(this.allData)
      .then(value => {
        this.allData = value;
        this.googleChartData = of(value);
      })
      .finally(() => {

      });


  }

  convertToArrayMap(data, name){
    const extractedData: Map<string, number> = new Map(data[`${name}`]);
    const arrayMap = [];
    extractedData.forEach((value, key) => {
      arrayMap.push([key, value]);
    });

    const sorted = arrayMap.sort((a, b) => b[1] - a[1]);

    return sorted.slice(0, 9);
  }

  makeChart(type, title, data, name) {
    const arrayMap = this.convertToArrayMap(data, name);
    if (arrayMap.length > 10) {
      console.log(arrayMap);
    }


    const chart: GoogleChartInterface = {
      chartType: type,
      dataTable: arrayMap,
      firstRowIsData: true,
      options: {
        title
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

  getChartData(server)  {
    const promise = new Promise((resolve, reject) => {
      this.http.get(`${environment.APIURL}api/ecotracker`, {headers: {requestedDate: this.utils.getFormattedDate(1), server, token: this.auth.getToken('token')}})
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

    return promise;
  }
}
