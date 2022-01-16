import { Component } from '@angular/core';
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
  public category: Category;
  private documentRef: any;
  private categoryService: CategoryService;

  constructor() {
    this.name = "";
    this.category = new Category();
    this.categoryService = new CategoryService();
    this.categoryService.getCategory().then(result => {
      const docs = result.docs.forEach((docs) => {
        this.documentRef = docs.ref;
        const data = JSON.parse(Utility.decrypt(docs.data()["data"]));
        this.category.setList(data);
        this.category.setDoUpdate(true);
      });
    }).catch((error) => {

    });
  }

  public submit() {
    if (Utility.isAlphabetic(this.name)) {
      this.category.getList()?.push(this.name);
      this.categoryService.insertOrUpdate(this.category, this.documentRef).then((result) => {
        this.name = "";
      }).catch((error) => {

      });
    }
  }
}
