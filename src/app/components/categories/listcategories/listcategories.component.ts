import { Component,inject, signal } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../classes/categories';
import { RouterLink } from '@angular/router';
import {categories} from '../../../store/store.signal'
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
this.loadcategories()   
 }
 loadcategories(){
  this.categorieService.getCategories().subscribe(data=>{
    this.categories.set(data)
    
   })
  }
  ngOnChanges(): void {
    this.loadcategories() 
  }
 deleteCategory(category:Categories) {
   this.categorieService.deleteCategory(category).subscribe(data => {
  return this.categories.update(categories => categories.filter(t => t._id !== category._id));
  })
 }

}
