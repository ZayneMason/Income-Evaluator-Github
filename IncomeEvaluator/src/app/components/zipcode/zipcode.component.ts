import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxDataService } from '../../taxdata.service';
import { ActivatedRoute } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ReusableChartComponent } from '../reuseablechart/reuseablechart.component';
import { ChartDataset, ChartData, ChartOptions } from 'chart.js';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-zipcode',
  standalone: true,
  imports: [
    CommonModule,
    ReusableChartComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatGridList,
    MatGridTile,
  ],
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss']
})
export class ZipcodeComponent implements OnInit {
  agiData: any[] = [];
  totalIncome: number = 0;
  totalIndividuals: number = 0;
  averageIncome: number = 0;
  chartData: ChartData<'bar'> = {
    datasets: [],
    labels: [],
  };
  chartLabels: string[] = [];
  zipcode: string = '';

  constructor(private taxDataService: TaxDataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const zipcode = +params.get('zipcode')!;
      if (zipcode) {
        this.zipcode = zipcode.toString();
        this.taxDataService.getZipCodeTaxData(this.zipcode).subscribe(data => {
          this.agiData = data;
          this.calculateTotals(); // Call calculateTotals after data is fetched
          this.prepareChartData(); // Prepare chart data
        });
      }
    });
  }

  convertAgiSizeToLabel(agiSize: number): string {
    switch (agiSize) {
      case 1:
        return '$1 - $25,000';
      case 2:
        return '$25,001 - $50,000';
      case 3:
        return '$50,001 - $75,000';
      case 4:
        return '$75,001 - $100,000';
      case 5:
        return '$100,001 - $200,000';
      case 6:
        return '$200,000+';
      default:
        return '';
    }
  }

  calculateTotals(): void {
    let totalWeightedIncome = 0;
    let totalIndividuals = 0;

    this.agiData.forEach(agi => {
      totalWeightedIncome += agi.adjustedGrossIncome * 1000;
      totalIndividuals += agi.numberOfIndividuals;
    });

    this.totalIncome = totalWeightedIncome;
    this.totalIndividuals = totalIndividuals;

    if (totalIndividuals > 0) {
      this.averageIncome = parseFloat((totalWeightedIncome / totalIndividuals).toFixed(2));
    } else {
      this.averageIncome = 0;
    }
  }

  prepareChartData(): void {
    this.chartLabels = this.agiData.map(agi => this.convertAgiSizeToLabel(agi.agiSize));
    this.chartData = {
      labels: this.chartLabels,
      datasets: [{
        data: this.agiData.map(agi => agi.adjustedGrossIncome),
        label: 'Adjusted Gross Income',
        backgroundColor: '#42A5F5',
        
      }]
    };
  }
}
