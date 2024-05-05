import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Categories } from '../../../classes/categories';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajoutcateg',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ajoutcateg.component.html',
  styleUrl: './ajoutcateg.component.css'
})
export class AjoutcategComponent {
  newcategory=signal<Categories>({})

   public categorieService = inject(CategoriesService);
   constructor(private route:Router){}

  
  createCategory(){ 
    if(this.newcategory().nomcategorie==null){
      alert("valleur nom catégorie incorrecte")
      return;
    }
    if(this.newcategory().imagecategorie==null){
      alert("valleur image catégorie incorrecte")
      return;
    }
     this.categorieService.createCategory(this.newcategory()).subscribe(((data: any)=>{
      this.route.navigate(['/affichcat'])
      
      }))
    this.route.navigate(['/affichcat'])
    
   }
   annuler(){
    this.route.navigate(['/affichcat'])
   }

}
