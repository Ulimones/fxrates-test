import { Component, OnInit } from '@angular/core';
import { FixerService } from 'src/app/services/fixer.service';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public money:any=[];
  public exrate:number=0;
  public exrateHistorical:number=0;
  public exrateHistoricalNow:number=0;
  public EURexrateHistorical:number=0;
  public EURexrateHistoricalNow:number=0;
  public amount:number=1;
  public result:number=0;

  public moneyGraph:Label=''
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartOptions: ChartOptions = {responsive: true};
  public barChartLabels: Label[] = ['EUR'];
  public barChartType: ChartType = 'bar';
 
  public barChartData: ChartDataSets[] =[{data:[1,0,0], label:'Fecha Actual'},
                                        { data:[1,0,0], label: 'Fecha anterior' }]

  public colors: Color[] = [
    { backgroundColor: [ '#EC8E71','#F9D161' ] }
  ];

  public valueOption=null;
  public rates={};
  public historicalRates={};
  public arrayEUR:any=[1,0];
  public arrayExchange:any=[1,0];
  public date='';
  public DateToday;
  public currentMoney='';

  constructor(private fxservice:FixerService) {
    const today = new Date();
    this.DateToday= `${today.getFullYear()}-${today.getMonth()+1}-0${today.getDate()}`;
  }

  async ngOnInit() {
    await this.getLatest();
    this.money = Object.keys(this.rates);
  }

  updGraph(){
    this.barChartData=[{data:this.arrayEUR, label:'Fecha actual'},{ data:this.arrayExchange, label: this.date }]
    this.barChartLabels[0]=this.currentMoney;
  }

  async getLatest() {
    const response: any = await this.fxservice.getLatest();
    this.rates= response.rates;
  }

  async getHistorical(date) {
    const response: any = await this.fxservice.getHistorical(date);
    this.historicalRates= response.rates;
    this.exrateHistorical= this.historicalRates[this.currentMoney];
  }

  onChangeMoney(e){
    this.exrate= this.rates[e];
    this.setResult();
  }
  
  onChangeValue(e){
   this.amount= e.target.value;
   this.setResult();
  }

  onChangeMoneyHistorical(e){
    this.currentMoney=e;
    this.exrateHistoricalNow=this.rates[e];
  }

  setResult(){
    this.result= Number((this.amount*this.exrate).toFixed(2));
  }

  onChangeDate(e){
    this.date=e.target.value;
  }

  async getResult(){
    if(this.currentMoney==''){
      Swal.fire({
        title: 'Error!',
        text: 'No se ha seleccionado una moneda',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    if(this.date==''){
      Swal.fire({
        title: 'Error!',
        text: 'No se ha seleccionado una fecha',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    if(Date.parse(this.date) > Date.parse(this.DateToday) ){
      Swal.fire({
        title: 'Error!',
        text: 'La fecha seleccionada es mayor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    
    await this.getHistorical(this.date);
    this.arrayEUR[0]= this.exrateHistoricalNow;
    this.arrayExchange[0]= this.exrateHistorical;
    this.updGraph();
  }



   
}
