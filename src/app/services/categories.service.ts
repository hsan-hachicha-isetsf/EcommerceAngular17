import { Injectable,inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../classes/categories';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public http = inject(HttpClient);
  public url = 'http://localhost:3001/api/categories';
  categories = signal<Categories[]>([]);
  constructor() { }
   getCategories(){
     this.http.get<Categories[]>(this.url).subscribe(data => { 
     this.categories.set(data);
   })
      
    return this.categories;
   
  }

  deleteCategory(category: Categories) {
    this.http.delete<Categories>(this.url + '/' + category._id)
    .subscribe(data => {
     
      return this.categories.update(categories => categories.filter(t => t._id !== category._id));
    })
    
  }

  
  
    createCategory(category: Categories) {
      return this.http.post(this.url+'/' , category).subscribe(((data: any)=>{
          
        this.categories.set([...this.categories(), category]);
        }))
      }
  
      updateCategory(category: Categories) {
        this.http.put(this.url+ '/' + category._id, category)
        .subscribe(data => {
         
        return this.categories.update(categories => {
          const index = categories.findIndex(t => t._id === category._id);
          categories[index] = category;
          return categories;
        });
      })
      }

      findCategory(_id:object | undefined) {

        return this.http.get(this.url + '/' +  _id)
           }
     
}
