import { Component, Input } from '@angular/core';
import { MatCardModule, MatCard } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);


@Component({
  selector: 'app-reusable-chart',
  standalone: true,
  imports: [
    MatCardModule,
    MatCard,
    BaseChartDirective
  ],
  templateUrl: './reuseablechart.component.html',
  styleUrls: ['./reuseablechart.component.css'],
  providers: []
})
export class ReusableChartComponent {
  @Input()
  chartData!: ChartData;
  @Input()
  chartLabels!: string[];
  @Input()
  chartOptions!: ChartOptions;
  @Input()
  chartType!: ChartType;
}