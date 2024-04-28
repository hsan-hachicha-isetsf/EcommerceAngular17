import { Component, Input, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categories } from '../../../classes/categories';
import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifcateg',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modifcateg.component.html',
  styleUrl: './modifcateg.component.css'
})
export class ModifcategComponent {
  
  category=signal<Categories>({})
  public categorieService = inject(CategoriesService);
   constructor(private router:Router,private route:ActivatedRoute){}
   catId:object
   ngOnInit(){
    this.catId=this.route.snapshot.params['id'];
    
     this.categorieService.findCategory(this.catId).subscribe(data => {
      this.category.set(data);
      
    });
     }
     modifCategory() { 
      this.categorieService.updateCategory(this.category());
      this.router.navigate(['/affichcat'])
     }
     annuler(){
      this.router.navigate(['/affichcat'])
     }
}
