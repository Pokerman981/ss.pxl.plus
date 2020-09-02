/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 7/8/20, 10:29 PM
 * File: playercounter.component.ts
 * Project: ss.pxl.plus
 */

import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../../../services/utils/utils.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../services/auth/auth.service';
import {environment} from '../../../../../environments/environment';
import {FormControl} from '@angular/forms';
import {GoogleChartComponent, GoogleChartInterface, GoogleChartsLoaderService} from 'ng2-google-charts';
import {of} from 'rxjs';

@Component({
  selector: 'app-playercounter',
  templateUrl: './playercounter.component.html',
  styleUrls: ['./playercounter.component.css']
})
export class PlayercounterComponent implements OnInit {

  constructor(private utils: UtilsService, private http: HttpClient, private auth: AuthService, private loader: GoogleChartsLoaderService) { }

  chartData;
  chart: GoogleChartInterface;
  @Input() observChart;

  dateHigher = new FormControl(this.utils.dateMinusDayOrNum(0));
  dateLower = new FormControl(this.utils.dateMinusDayOrNum(-7));


  ngOnInit(): void {
    this.getChart();
  }

  async fullRequestAndFormat() {
    await this.requestPlayerCounts()
      .then(async (value) => {
        await this.formatRequest(value)
          .then(formatted => {
            console.log(formatted);
            this.chartData = formatted;
            this.chart = this.makeChart('LineChart', 'Player Counter', this.chartData);
            this.observChart = of(this.chart);
            return true;
          })
          .catch(reason => {
            console.log(reason);
          });
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  async formatRequest(data) {
    const tempArray = [];
    tempArray.push(
      [{label: 'Date', id: 'date', type: 'date'},
      {label: 'Dash', id: 'dash', type: 'number'},
      {label: 'Verse', id: 'verse', type: 'number'},
      {label: 'Legends', id: 'legends', type: 'number'},
      {label: 'Club', id: 'club', type: 'number'},
      {label: 'Brawl', id: 'brawl', type: 'number'},
      {label: 'Zone', id: 'zone', type: 'number'}]
    );
   // tempArray.push(['Date', 'Dash', 'Verse', 'Legends', 'Club', 'Brawl', 'Zone']);
    for (const ping of data) {
      const dataLine = JSON.parse(ping.data);
      const dataArray = [new Date(ping.date)];
      for (const innerData of dataLine) {
        dataArray.push(innerData.onlinePlayers);
      }
      tempArray.push(dataArray);
    }
    return tempArray;
  }

  requestPlayerCounts() {
    return this.http.get(`${environment.APIURL}api/playercounter`, {
      headers: {lowerDate: this.utils.getTimeStamp(new Date(this.dateLower.value)),
        higherDate: this.utils.getTimeStamp(new Date(this.dateHigher.value)),
        token: this.auth.getToken('token')}
    })
      .toPromise();

  }

  makeChart(type, title, data) {

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return {
      chartType: type,
      dataTable: data,
      firstRowIsData: false,
      options: {
        firstRowIsData: false,
        height: (windowHeight * .70),
        width: (windowWidth),
        interpolateNulls: true,
        title,
        curveType: 'function',
        legend: 'bottom',
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        explorer: {
          maxZoomOut: 1,
          maxZoomIn: .1
        }
      }
    };
  }

  getChart() {
    const chart = this.fullRequestAndFormat()
      .then(async () => {
        this.adjustWidthAndHeight();
        return this.chart;
      });

    console.log(chart);
    return chart;
  }

  inputChart(data) {
    const chartEle = new ElementRef<any>(document.getElementById('googlechart'));
    return new GoogleChartComponent(chartEle, this.loader);
  }

  @HostListener('window:resize')
  adjustWidthAndHeight() {
    const playercounter = document.getElementById('playercounter');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    if (playercounter == null || playercounter.offsetHeight === 0) { setTimeout(() => { this.adjustWidthAndHeight(); }, 100); return; }
    playercounter.style.height = (windowHeight * .75) + 'px';
    playercounter.style.width = (windowWidth) + 'px';

  }

  getMostRecent() {
    return this.chart;
  }

}
