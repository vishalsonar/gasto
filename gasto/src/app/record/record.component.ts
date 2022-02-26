import { Component } from '@angular/core';
import { Record } from '../entity/record';
import { RecordService } from '../service/record.service';
import { Utility } from '../service/utility';
import { CategoryService } from '../service/category.service';
import { Message } from '../service/message';
import { StatisticsService } from '../service/statistics.service';

declare function showSuccessMessage(message: any): any;
declare function showErrorMessage(message: any): any;

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent {

  public amount: string;
  public category: string;
  public isDisable: boolean;
  public categoryList: string[];
  private statMap: any;
  private record: Record;
  private documentRef: any;
  private recordService: RecordService;
  private categoryService: CategoryService;
  private statisticsService: StatisticsService;

  constructor() {
    this.refresh();
    this.amount = '';
    this.category = '';
    this.statMap = {};
    this.categoryList = [];
    this.isDisable = false;
    this.record = new Record();
    this.recordService = new RecordService();
    this.categoryService = new CategoryService();
    this.statisticsService = new StatisticsService();
    this.loadCategory();
    this.loadStat();
  }

  private loadCategory() {
    this.categoryService.getCategory().then(result => {
      result.docs.forEach((docs) => {
        this.categoryList = JSON.parse(Utility.decrypt(docs.data()["data"])).sort();
        this.category = this.categoryList[0];
      });
    }).catch((error) => {
      showErrorMessage(Message.server_error);
    });
  }

  private loadStat() {
    this.statisticsService.getStats().then((result) => {
      result.docs.forEach((docs) => {
        this.documentRef = docs.ref;
        this.statMap = JSON.parse(Utility.decrypt(docs.data()["data"]));
      });
    }).catch((error) => {
      showErrorMessage(Message.server_error);
    });
  }

  private reset() {
    this.amount = '';
    this.category = '';
    this.isDisable = false;
  }

  private refresh() {
    if (!Utility.getSessionRefresh()) {
      Utility.setSessionRefresh(true);
      window.location.reload();
    }
  }

  public submit() {
    if (this.amount == null || this.amount.trim() == "") {
      showErrorMessage(Message.record_empty_amount);
      return;
    }
    if (this.category.trim() == "") {
      showErrorMessage(Message.record_empty_category);
      return;
    }
    if (Utility.isNumeric(this.amount)) {
      this.isDisable = true;
      this.record.setAmount(this.amount);
      this.record.setCategory(this.category);
      this.recordService.insertRecord(this.record.build()).then((result) => {
        this.updateStat();
        this.reset();
        showSuccessMessage(Message.record_insert_success);
      }).catch((error) => {
        showErrorMessage(Message.record_insert_failure);
      });
    } else {
      showErrorMessage(Message.record_invalid_amount);
    }
  }

  public updateStat() {
    const isInsert = Object.keys(this.statMap).length == 0;
    const category = this.record.getCategory();
    if (category) {
      const value = this.statMap[category];
      let amount = Number(this.record.getAmount());
      let count = 1;
      if (value && amount) {
        amount += Number(value["amount"]);
        count += Number(value["count"]);
      }
      this.statMap[category] = {
        "amount": amount,
        "count": count
      };
      if (isInsert) {
        this.statisticsService.insertStat(this.statMap).then((result) => {
          this.loadStat();
        });
      } else {
        this.statisticsService.updateStat(this.statMap, this.documentRef);
      }
    }
  }

}
