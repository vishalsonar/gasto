import { Component } from '@angular/core';
import { elementAt } from 'rxjs';
import { Category } from '../entity/category';
import { CategoryService } from '../service/category.service';
import { Utility } from '../service/utility';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  public name: string;
  public search: string;
  private documentRef: any;
  public category: Category;
  public isSubmitDisabled: boolean;
  private categoryList: string[];
  private categoryService: CategoryService;

  constructor() {
    this.name = "";
    this.search = "";
    this.categoryList = [];
    this.isSubmitDisabled = false;
    this.category = new Category();
    this.categoryService = new CategoryService();
    this.categoryService.getCategory().then(result => {
      result.docs.forEach((docs) => {
        this.documentRef = docs.ref;
        const data = JSON.parse(Utility.decrypt(docs.data()["data"])).sort();
        this.category.setList(data);
        this.category.setDoUpdate(true);
        this.categoryList = data;
      });
    }).catch((error) => {

    });
  }

  public submit() {
    if (Utility.isAlphabetic(this.name) && !this.isNamePresent()) {
      this.isSubmitDisabled = true;
      this.category.getList()?.push(this.name.toUpperCase());
      this.categoryService.insertOrUpdate(this.category, this.documentRef).then((result) => {
        this.name = "";
        this.isSubmitDisabled = false;
      }).catch((error) => {

      });
    }
  }

  private isNamePresent() {
    let state: boolean = false;
    const findElement = this.categoryList.filter(element => element == this.name.toUpperCase());
    if (findElement.length != 0) {
      state = true;
    }
    return state;
  }

  public searchToken() {
    const list = this.categoryList;
    if (list) {
      const trimToken = this.search.trim().toUpperCase();
      if (trimToken == "") {
        this.category.setList(this.categoryList);
        return;
      }
      const filteredList = list.filter(element => element.includes(trimToken));
        if (filteredList && filteredList.length != 0) {
          this.category.setList(filteredList.sort());
        }
    }
  }

  public removeCategory(target: any) {
    const list = this.categoryList.filter(element => element !== target.id);
    if (list && list.length != 0) {
      this.categoryList = list;
      this.category.setList(list);
      this.categoryService.insertOrUpdate(this.category, this.documentRef).then((result) => {
        
      }).catch((error) => {

      });
    }
  }
}
