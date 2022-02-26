import { Component } from '@angular/core';
import { Record } from '../entity/record';
import { Message } from '../service/message';
import { RecordService } from '../service/record.service';

declare function showErrorMessage(message: any): any;
declare function showWarningMessage(message: any): any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  public startDate: any;
  public endDate: any;
  public isDisabled: boolean;
  private recordService: RecordService;
  public dateAmountList: any;
  public categoryAmountList: any;
  public isTableVisible: boolean;
  
  constructor() { 
    this.isDisabled = false;
    this.dateAmountList = {};
    this.categoryAmountList = {};
    this.isTableVisible = false;
    this.recordService = new RecordService();
  }

  public reset() {
    this.startDate = null;
    this.endDate = null;
  }

  public submit() {
    if (this.startDate == null) {
      showErrorMessage(Message.statement_invalid_start_date);
      return;
    }
    if (this.endDate == null) {
      showErrorMessage(Message.statement_invalid_end_date);
      return;
    }
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    if (startDate.toString() === 'Invalid Date') {
      showErrorMessage(Message.statement_invalid_start_date);
      return;
    }
    if (endDate.toString() === 'Invalid Date') {
      showErrorMessage(Message.statement_invalid_end_date);
      return;
    }
    if (endDate.toString() == startDate.toString()) {
      showErrorMessage(Message.statement_end_greater_start_date);
      return;
    }
    if (endDate >= startDate) {
      this.isDisabled = true;
      this.dateAmountList = {};
      this.categoryAmountList = {};
      this.isTableVisible = true;
      this.recordService.getRecordsByDate(startDate, endDate).then((result) => {
        result.docs.forEach((snapshot) => {
          const entry: Record = new Record().convertToDisplayRecord(snapshot.data()["data"]);
          let date = entry.getDate();
          let category = entry.getCategory();
          let latitude = entry.getLatitude();
          let longitude = entry.getLongitude();
          let amount = entry.getAmount();
          if (date && category && latitude && longitude && amount) {
            if (this.dateAmountList[date.toDateString()]) {
              let tempAmount = this.dateAmountList[date.toDateString()];
              this.dateAmountList[date.toDateString()] = Number(Number(tempAmount) + Number(amount));
            } else {
              this.dateAmountList[date.toDateString()] = Number(amount);
            }
            if (this.categoryAmountList[category]) {
              let tempAmount = this.categoryAmountList[category];
              this.categoryAmountList[category] = Number(Number(tempAmount) + Number(amount));
            } else {
              this.categoryAmountList[category] = Number(amount);
            }
          }
        });
        this.isDisabled = false;
      });
    } else {
      showErrorMessage(Message.statement_end_greater_start_date);
      return;
    }
  }
}
