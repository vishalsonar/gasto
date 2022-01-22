import { Component } from '@angular/core';
import { Record } from '../entity/record';
import { RecordService } from '../service/record.service';
import { Utility } from '../service/utility';
import * as $ from 'jquery';
import { CategoryService } from '../service/category.service';

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
  private recordService: RecordService;
  private categoryService: CategoryService;

  constructor() {
    this.amount = '';
    this.category = '';
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

    });
  }

  private reset() {
    this.amount = '';
    this.category = '';
  }

  public submit() {
    if (Utility.isNumeric(this.amount)) {
      this.record.setAmount(this.amount);
      this.record.setCategory(this.category);
      this.recordService.insertRecord(this.record.build()).then((result) => {
        this.reset();
        console.debug("RecordComponent :: submit :: Date Inserted Successfully");
      }).catch((error) => {
        console.debug("RecordComponent :: submit :: Error While Date Insert");
      });
    } else {
      console.error("RecordComponent :: submit :: Invalid amount");
    }
  }

  public selectedCategory(htmlElement: any) {
    console.log(htmlElement);
  }

}
