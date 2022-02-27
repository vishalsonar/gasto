import { Component } from '@angular/core';
import { Record } from '../entity/record';
import { i18n } from '../i18n/i18n';
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

  public startDate: any;
  public endDate: any;
  public i18n: i18n;
  public recordList: any;
  public currentPage: number;
  public pagination: number[];
  public isDisabled: boolean;
  public isTableVisible: boolean;
  private rowListLength: number;
  private allRecordList: Record[];
  private recordService: RecordService;

  constructor() {
    this.i18n = new i18n();
    this.recordList = [];
    this.currentPage = 0;
    this.rowListLength = 20;
    this.pagination = [1];
    this.allRecordList = [];
    this.isDisabled = false;
    this.isTableVisible = false;
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
    let list: Record[][] = [];
    if (endDate >= startDate) {
      this.isDisabled = true;
      this.isTableVisible = true;
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
      showErrorMessage(Message.statement_end_greater_start_date);
      return;
    }
  }

  public reset() {
    this.startDate = null;
    this.endDate = null;
  }
}
