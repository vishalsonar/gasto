import { Component } from '@angular/core';
import { Record } from '../entity/record';
import { RecordService } from '../service/record.service';
import { Utility } from '../service/utility';
import { CategoryService } from '../service/category.service';
import { Message } from '../service/message';

declare function showSuccessMessage(message: any): any;
declare function showErrorMessage(message: any): any;

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent {

  public amount: string;
  private record: Record;
  public category: string;
  public categoryList: string[];
  public isDisable: boolean;
  private recordService: RecordService;
  private categoryService: CategoryService;

  constructor() {
    this.refresh();
    this.amount = '';
    this.category = '';
    this.isDisable = false;
    this.record = new Record();
    this.categoryList = ["Category"];
    this.recordService = new RecordService();
    this.categoryService = new CategoryService();
    this.categoryService.getCategory().then(result => {
      result.docs.forEach((docs) => {
        this.categoryList = JSON.parse(Utility.decrypt(docs.data()["data"])).sort();
        this.category = this.categoryList[0];
      });
    }).catch((error) => {
      error(Message.server_error);
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
    if (Utility.isNumeric(this.amount)) {
      this.isDisable = true;
      this.record.setAmount(this.amount);
      this.record.setCategory(this.category);
      this.recordService.insertRecord(this.record.build()).then((result) => {
        this.reset();
        showSuccessMessage(Message.record_insert_success);
      }).catch((error) => {
        showErrorMessage(Message.record_insert_failure);
      });
    } else {
      showErrorMessage(Message.record_invalid_amount);
    }
  }

}
