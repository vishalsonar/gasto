import { Component } from '@angular/core';
import { Record } from '../entity/record';
import { RecordService } from '../service/record.service';
import { Utility } from '../service/utility';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent {

  public amount: string;
  public comment: string;
  private recordService: RecordService;
  private record: Record;

  constructor() {
    this.amount = '';
    this.comment = '';
    this.recordService = new RecordService();
    this.record = new Record();
  }

  private reset() {
    this.amount = '';
    this.comment = '';
  }

  public submit() {
    if (Utility.isValidateNumber(this.amount)) {
      this.record.setAmount(this.amount);
      this.record.setComment(this.comment);
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

}
