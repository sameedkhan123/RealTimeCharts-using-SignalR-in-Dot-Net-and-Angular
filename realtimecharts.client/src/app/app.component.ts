import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { ChartConfiguration, ChartType } from 'chart.js';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0
      }
    }
  };
  chartLabels: string[] = ['Real time data for the chart'];
  chartType: ChartType = 'bar';
  chartLegend: boolean = true;
  constructor(private http: HttpClient,public signalRService: SignalrService) {}

  ngOnInit() {
    this.getForecasts();
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();   
    this.startHttpRequest();
  }
  private startHttpRequest = () => {
    this.http.get('https://localhost:7189/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'realtimecharts.client';
}
