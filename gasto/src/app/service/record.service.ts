import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc } from '@angular/fire/firestore';
import { Utility } from './utility';
import { Record } from '../entity/record';

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
}
