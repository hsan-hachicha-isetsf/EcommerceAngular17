import { Injectable,inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../classes/categories';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public http = inject(HttpClient);
  public url = 'http://localhost:3001/api/categories';
  categories = signal<Categories[]>([]);
  constructor() { }
   
  getCategories():Observable<Categories[]>{
    return this.http.get<Categories[]>(this.url)
  }
  deleteCategory(category: Categories):Observable<Categories> {
   return  this.http.delete<Categories>(this.url + '/' + category._id)
    
    
  }

  
  
    createCategory(category: Categories) {
      return this.http.post(this.url+'/' , category)
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
