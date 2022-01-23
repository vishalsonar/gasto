import { Component } from '@angular/core';
import { Statistics } from '../entity/statistics';
import { Message } from '../service/message';
import { StatisticsService } from '../service/statistics.service';

declare function showErrorMessage(message: any): any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  public loading: boolean;
  public noDataFound: boolean;
  public statistics: Statistics[];

  constructor() {
    this.loading = true;
    this.statistics = [];
    this.noDataFound = false;
    new StatisticsService().load().then((result) => {
      this.loading = false;
      if (result.length == 0) {
        this.noDataFound = true;
      } else {
        this.statistics = result;
      }
    }).catch((error) => {
      showErrorMessage(Message.statistics_load_failure);
    });
  }

}
