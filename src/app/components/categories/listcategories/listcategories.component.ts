import { Component,inject, signal } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../classes/categories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listcategories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listcategories.component.html',
  styleUrl: './listcategories.component.css'
})
export class ListcategoriesComponent {
  public categorieService = inject(CategoriesService);
  //categories:any;
  categories = signal<Categories[]>([]);
 ngOnInit(): void {
   this.categories=this.categorieService.getCategories();
 }

 deleteCategory(category:Categories):void {
   this.categorieService.deleteCategory(category)
 }

}
