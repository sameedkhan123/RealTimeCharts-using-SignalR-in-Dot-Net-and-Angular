import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { ChartModel } from '../interfaces/chartModel'; 

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }
  public data: ChartModel[] | undefined;
  private hubConnection: signalR.HubConnection | undefined
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:7189/chart')
                              .build();
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
    
    private _addTransferChartDataListener = () => {
    this.hubConnection?.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  };  public get addTransferChartDataListener() {
    return this._addTransferChartDataListener;
  }
  public set addTransferChartDataListener(value) {
    this._addTransferChartDataListener = value;
  }
}
