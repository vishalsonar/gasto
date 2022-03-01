import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, query, where, Timestamp } from '@angular/fire/firestore';
import { Utility } from './utility';
import { Record } from '../entity/record';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  private collectionPath: string;

  constructor() { 
    this.collectionPath = "/users/expense/" + Utility.getUID();
  }

  public insertRecord(record: Record) {
    const userCollection = collection(getFirestore(), this.collectionPath);
    return addDoc(userCollection, record.convertToStoreData());
  }

  public async getRecords() {
    const userCollection = collection(getFirestore(), this.collectionPath);
    return getDocs(userCollection);
  }

  public async getRecordsByDate(startDate: Date, endDate: Date) {
    const start: Timestamp = Timestamp.fromDate(startDate);
    const end: Timestamp = Timestamp.fromDate(endDate);
    const userCollection = collection(getFirestore(), this.collectionPath);
    const queryStatement = query(userCollection, where("timestamp", ">=", start),
                                                 where("timestamp", "<=", end),
                                                 orderBy("timestamp", "desc"));
    return getDocs(queryStatement);
  }
}
