import { Component } from '@angular/core';
import { Category } from '../entity/category';
import { i18n } from '../i18n/i18n';
import { CategoryService } from '../service/category.service';
import { Message } from '../service/message';
import { Utility } from '../service/utility';

declare function showSuccessMessage(message: any): any;
declare function showErrorMessage(message: any): any;
declare function showWarningMessage(message: any): any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  public i18n: i18n;
  public name: string;
  public search: string;
  private documentRef: any;
  public category: Category;
  public isDisabled: boolean;
  public notDataFound: boolean;
  private categoryList: string[];
  private categoryService: CategoryService;

  constructor() {
    this.name = "";
    this.search = "";
    this.i18n = new i18n();
    this.isDisabled = false;
    this.notDataFound = true;
    this.categoryList = [];
    this.category = new Category();
    this.categoryService = new CategoryService();
    this.categoryService.getCategory().then(result => {
      result.docs.forEach((docs) => {
        this.documentRef = docs.ref;
        const data = JSON.parse(Utility.decrypt(docs.data()["data"])).sort();
        this.category.setList(data);
        this.category.setDoUpdate(true);
        this.notDataFound = false;
      });
    }).catch((error) => {
      showErrorMessage(Message.server_error);
    });
  }

  public submit() {
    if (this.name == null || this.name.trim() == "") {
      showErrorMessage(Message.category_empty_name);
      return;
    }
    if (Utility.isAlphabetic(this.name)) {
      if (!this.isNamePresent()) {
        this.isDisabled = true;
        this.category.getList()?.push(this.name.toUpperCase());
        this.categoryService.insertOrUpdate(this.category, this.documentRef).then((result) => {
          this.name = "";
          this.isDisabled = false;
          this.notDataFound = false;
          showSuccessMessage(Message.category_insert_success);
        }).catch((error) => {
          showErrorMessage(Message.category_insert_failure);
        });
      } else {
        showErrorMessage(Message.category_name_already_present);
      }
    } else {
      showErrorMessage(Message.category_invalid_name);
    }
  }

  private isNamePresent() {
    let state: boolean = false;
    const list = this.category.getList();
    if (list) {
      const findElement = list.filter(element => element == this.name.toUpperCase());
      if (findElement.length != 0) {
        state = true;
      }
    }
    return state;
  }

  public searchToken() {
    const categoryList = this.category.getList();
    if (categoryList) {
      if (this.categoryList.length == 0) {
        this.categoryList = categoryList;
      }
      const trimToken = this.search.trim().toUpperCase();
      if (trimToken == "") {
        this.category.setList(this.categoryList);
        return;
      }
      const filteredList = this.categoryList.filter(element => element.includes(trimToken));
      if (filteredList && filteredList.length != 0) {
        this.category.setList(filteredList.sort());
      } else {
        showWarningMessage(Message.no_data_found);
      }
    }
  }

  public removeCategory(target: any) {
    const categoryList = this.category.getList();
    if (categoryList) {
      const list = categoryList.filter(element => element !== target.id);
      this.category.setList(list);
      this.categoryList = list;
      this.categoryService.insertOrUpdate(this.category, this.documentRef).then((result) => {
        showSuccessMessage(Message.category_remove_success);
      }).catch((error) => {
        showErrorMessage(Message.category_remove_failure);
      });
      if (list && list.length == 0) {
        this.notDataFound = true;
      }
    }
  }
}
