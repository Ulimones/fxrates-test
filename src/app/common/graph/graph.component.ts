import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input('labels') barChartLabels: Label[] = [];
  @Input('dataset')  info:number[]=[];
  @Input('title') title = 'sin titulo';

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] =[{data:[]}]

  public colors: Color[] = [
    { backgroundColor: [ '#6857E6','#009FEE','#F02059' ] }
  ];

   ngOnInit() {
    this.barChartData=[
      { data: this.info,label:this.title } ,
    ];
  
    
   
  }
}
