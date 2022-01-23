import { Component } from '@angular/core';
import { Record } from '../entity/record';
import { Message } from '../service/message';
import { RecordService } from '../service/record.service';

declare function showErrorMessage(message: any): any;
declare function showWarningMessage(message: any): any;

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css']
})
export class StatementComponent {

  private colon: string = ":";
  private hypen: string = "-";
  private zero_zero: string = "00";
  private rowListLength: number;
  private allRecordList: Record[];
  private recordService: RecordService;
  public toDate: any;
  public fromDate: any;
  public recordList: any;
  public currentPage: number;
  public pagination: number[];
  public isDisabled: boolean;

  constructor() {
    this.recordList = [];
    this.currentPage = 0;
    this.rowListLength = 20;
    this.pagination = [1];
    this.allRecordList = [];
    this.isDisabled = false;
    this.recordService = new RecordService();
    this.recordService.getRecords().then((result) => {
      result.docs.map(doc => doc.data()).forEach((entry) => {
        this.allRecordList.push(new Record().convertToDisplayRecord(entry["data"]));
      });
    }).catch((error) => {
      showErrorMessage(Message.server_error);
    });
  }

  public next() {
    const page = this.currentPage + 1;
    if (page < this.pagination.length) {
      this.currentPage = page;
    }
  }

  public prev() {
    const page = this.currentPage - 1;
    if (page >= 0) {
      this.currentPage = page;
    }
  }

  public formatDateTime(date: Date) {
    return (this.zero_zero + date.getDate()).slice(-2) + this.hypen + (this.zero_zero + (date.getMonth() + 1)).slice(-2) + this.hypen + date.getFullYear() + " "  + 
           (this.zero_zero + date.getHours()).slice(-2) + this.colon + (this.zero_zero + date.getMinutes()).slice(-2) + this.colon + (this.zero_zero + date.getSeconds()).slice(-2);
  }

  public submit() {
    if (this.toDate == null) {
      showErrorMessage(Message.statement_invalid_to_date);
      return;
    }
    if (this.fromDate == null) {
      showErrorMessage(Message.statement_invalid_from_date);
      return;
    }
    const startDate = new Date(this.toDate);
    const endDate = new Date(this.fromDate);
    if (startDate.toString() === 'Invalid Date') {
      showErrorMessage(Message.statement_invalid_to_date);
      return;
    }
    if (endDate.toString() === 'Invalid Date') {
      showErrorMessage(Message.statement_invalid_from_date);
      return;
    }
    if (endDate.toString() == startDate.toString()) {
      showErrorMessage(Message.statement_from_greater_to_date);
      return;
    }
    let list: Record[][] = [];
    if (endDate >= startDate) {
      this.isDisabled = true;
      for (let record in this.allRecordList) {
        const entry: Record = this.allRecordList[record];
        if (!entry.inRange(startDate, endDate)) {
          continue;
        }
        if (list.length == 0) {
          const firstChild = [];
          firstChild.push(entry);
          list.push(firstChild);
          continue;
        }
        const child = list.pop();
        if (child) {
          if (child.length < this.rowListLength) {
            child.push(entry);
            list.push(child);
          } else {
            const newChild = [];
            newChild.push(entry);
            list.push(child, newChild);
            const page = this.pagination.pop();
            if (page) {
              this.pagination.push(page, page + 1);
            }
          }
        }
      }
    } else {
      showErrorMessage(Message.statement_from_greater_to_date);
      return;
    }
    if (list.length > 0) {
      this.recordList = list;
    } else {
      showWarningMessage(Message.no_data_found);
    }
    this.isDisabled = false;
  }

  public reset() {
    this.toDate = null;
    this.fromDate = null;
  }
}
