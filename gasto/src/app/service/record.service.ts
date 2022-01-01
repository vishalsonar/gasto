import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { Utility } from './utility';
import { Record } from '../entity/record';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private uid: any;

  constructor() { 
    this.uid = Utility.getUID();
  }

  public insertRecord(record: Record) {
    const userCollection = collection(getFirestore(), "/users/" + this.uid + "/" + record.getDate());
    return addDoc(userCollection, record.convertToStoreData());
  }

  public getAllRecord() {

  }

  // getDocs(userCollection).then((result) => {
    //   console.log(result.docs.map(doc => doc.data()));
    // }).catch((error) => {

    // });
}
