import { Component, OnInit } from '@angular/core';
import {ChartType} from 'angular-google-charts';

@Component({
  selector: 'app-ecotracker',
  templateUrl: './ecotracker.component.html',
  styleUrls: ['./ecotracker.component.css']
})
export class EcotrackerComponent implements OnInit {
  chartType = ChartType.ColumnChart;
  chartColumns = ['City', 'Inhabitants'];

  chartData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
