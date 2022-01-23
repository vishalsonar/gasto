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
  public isSubmitDisable: boolean;
  private recordService: RecordService;
  private categoryService: CategoryService;

  constructor() {
    this.refresh();
    this.amount = '';
    this.category = '';
    this.isSubmitDisable = false;
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
    this.isSubmitDisable = false;
  }

  private refresh() {
    if (!Utility.getSessionRefresh()) {
      Utility.setSessionRefresh(true);
      window.location.reload();
    }
  }

  public submit() {
    if (Utility.isNumeric(this.amount)) {
      this.isSubmitDisable = true;
      this.record.setAmount(this.amount);
      this.record.setCategory(this.category);
      this.recordService.insertRecord(this.record.build()).then((result) => {
        this.reset();
        showSuccessMessage("Record inserted Successfully");
      }).catch((error) => {
        showErrorMessage("Error While Record Insert");
      });
    } else {
      showErrorMessage("Invalid amount");
    }
  }

}
