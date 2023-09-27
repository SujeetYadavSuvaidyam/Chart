import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartserviceService } from '../chartservice.service';
Chart.register(...registerables)
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  constructor(private http: ChartserviceService) { }
  chardata: any;
  labledata: any[] = [];
  roledata: any[] = [];
  colordata: any[] = [];

  ngOnInit(): void {
    this.http.GetChartInfo().subscribe(((res) => {
      this.chardata = res
      console.log(this.chardata)
      if (this.chardata != null) {
        for (let index = 0; index < this.chardata.length; index++) {
          // const element = this.chardata[index];
          // console.log(this.chardata[index])
          this.labledata.push(this.chardata[index].year)
          this.roledata.push(this.chardata[index].amount)
          this.colordata.push(this.chardata[index].colorcode)
        }
        this.RenderChart(this.labledata, this.roledata, this.colordata, 'bar', 'barchart');
        this.RenderChart(this.labledata, this.roledata, this.colordata, 'pie', 'piechart');
      }
    }))
  };
  RenderChart(labledata: any, maindata: any, colordata: any, type: any, id: any) {
    // var ctx = document.getElementById('barchart');
    var myChart = new Chart(id, {
      type: type,
      data: {
        labels: labledata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
}
