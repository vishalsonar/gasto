import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, updateDoc } from '@angular/fire/firestore';
import { Category } from '../entity/category';
import { Utility } from './utility';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private collectionPath: string;

  constructor() { 
    this.collectionPath = "/users/category/" + Utility.getUID();
  }

  public insertCategory(category: Category) {
    const userCollection = collection(getFirestore(), this.collectionPath);
    return addDoc(userCollection, category.convertToStoreData());
  }

  public updateCategory(category: Category, documentRef: any) {
    return updateDoc(documentRef, category.convertToStoreData());
  }

  public async getCategory() {
    const userCollection = collection(getFirestore(), this.collectionPath);
    return getDocs(userCollection);
  }

  public async insertOrUpdate(category: Category, documentRef: any) {
    if (category.getDoUpdate()) {
      return this.updateCategory(category, documentRef);
    } else {
      return this.insertCategory(category);
    }
  }
  
}
