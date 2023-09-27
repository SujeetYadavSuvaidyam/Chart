import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartserviceService {
  chartUrl = 'http://localhost:3000/sels'
  constructor(private http: HttpClient) { }
  GetChartInfo() {
    return this.http.get(this.chartUrl)
  }
}
