import { Injectable } from '@angular/core';
import { Statistics } from '../entity/statistics';
import { Message } from './message';
import { RecordService } from './record.service';

declare function showErrorMessage(message: any): any;

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private recordService: RecordService;

  constructor() {
    this.recordService = new RecordService();
  }

  public async load(): Promise<Statistics[]> {
    let name;
    let instance;
    let statistics;
    let statisticsMap: any = {};
    let statisticsList: Statistics[] = [];
    await this.recordService.getRecords().then((result) => {
      result.docs.map(doc => doc.data()).forEach((entry) => {
        statistics = new Statistics().convertRecord(entry["data"]);
        name = statistics.getName();
        if (name) {
          instance = statisticsMap[name];
          if (instance) {
            statistics.update(instance);
          }
          statisticsMap[name] = statistics;
        }
      });
      statisticsList = Object.values(statisticsMap);
    }).catch((error) => {
      showErrorMessage(Message.server_error);
    });
    return statisticsList;
  }
}
