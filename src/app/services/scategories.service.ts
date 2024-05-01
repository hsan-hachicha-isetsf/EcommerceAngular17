
import { Injectable,inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scategorie } from '../classes/scategorie';
@Injectable({
  providedIn: 'root'
})
export class ScategoriesService {

  public http = inject(HttpClient);
  public url = 'http://localhost:3001/api/scategories';
  scategories = signal<Scategorie[]>([]);
  constructor() { }
   getScategories(){
     this.http.get<Scategorie[]>(this.url).subscribe(data => { 
     this.scategories.set(data);
   })
      
    return this.scategories;
   
  }

  deleteScategory(scategory: Scategorie) {
    this.http.delete<Scategorie>(this.url + '/' + scategory._id)
    .subscribe(data => {
     
      return this.scategories.update(scategories => scategories.filter(t => t._id !== scategory._id));
    })
    
  }

  
  
    createScategory(scategory: Scategorie) {
      return this.http.post(this.url+'/' , scategory).subscribe(((data: any)=>{
          
        this.scategories.set([...this.scategories(), scategory]);
        }))
      }
  
      updateScategory(scategory: Scategorie) {
        this.http.put(this.url+ '/' + scategory._id, scategory)
        .subscribe(data => {
         
        return this.scategories.update(scategories => {
          const index = scategories.findIndex(t => t._id === scategory._id);
          scategories[index] = scategory;
          return scategories;
        });
      })
      }

      findScategory(_id:object | undefined) {

        return this.http.get(this.url + '/' +  _id)
           }
     
}