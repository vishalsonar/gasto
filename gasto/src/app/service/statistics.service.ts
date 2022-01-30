import { Injectable } from '@angular/core';
import { collection, getFirestore, addDoc, updateDoc, getDocs } from 'firebase/firestore';
import { Statistics } from '../entity/statistics';
import { Message } from './message';
import { Utility } from './utility';

declare function showErrorMessage(message: any): any;

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private collectionPath: string;

  constructor() {
    this.collectionPath = "/users/statistics/" + Utility.getUID();
  }

  public insertStat(stat: any) {
    const data = Utility.encrypt(JSON.stringify(stat));
    const userCollection = collection(getFirestore(), this.collectionPath);
    return addDoc(userCollection, {"data": data});
  }

  public updateStat(stat: any, documentRef: any) {
    const data = Utility.encrypt(JSON.stringify(stat));
    return updateDoc(documentRef, {"data": data});
  }

  public async getStats() {
    const userCollection = collection(getFirestore(), this.collectionPath);
    return getDocs(userCollection);
  }

  public async load(): Promise<Statistics[]> {
    let statisticsList: Statistics[] = [];
    await this.getStats().then((result) => {
      result.docs.map(doc => doc.data()).forEach((entry) => {
        const statMap = JSON.parse(Utility.decrypt(entry["data"]));
        for (const [key, value] of Object.entries(statMap)) {
          statisticsList.push(new Statistics().fromStoreData(value, key));
        }
      });
    }).catch((error) => {
      showErrorMessage(Message.server_error);
    });
    return statisticsList;
  }
}
