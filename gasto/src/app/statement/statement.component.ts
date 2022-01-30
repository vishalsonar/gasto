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
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
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
      this.recordService.getRecordsByDate(startDate, endDate).then((result) => {
        result.docs.forEach((snapshot) => {
          const entry: Record = new Record().convertToDisplayRecord(snapshot.data()["data"]);
          if (list.length == 0) {
            const firstChild = [];
            firstChild.push(entry);
            list.push(firstChild);
          } else {
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
        });
        if (list.length > 0) {
          this.recordList = list;
        } else {
          showWarningMessage(Message.no_data_found);
        }
        this.isDisabled = false;
      });
    } else {
      showErrorMessage(Message.statement_from_greater_to_date);
      return;
    }
  }

  public reset() {
    this.toDate = null;
    this.fromDate = null;
  }
}
