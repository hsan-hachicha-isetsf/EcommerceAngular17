import { Component, inject, signal } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { Article } from '../../../classes/article';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Scategorie } from '../../../classes/scategorie';

import { ScategoriesService } from '../../../services/scategories.service';

@Component({
  selector: 'app-ajoutarticle',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './ajoutarticle.component.html',
  styleUrl: './ajoutarticle.component.css'
})
export class AjoutarticleComponent {
  art=signal<Article>({})
  tabscat=signal<Scategorie[]>([])
  public articleService = inject(ArticlesService);
  scategorieService=inject(ScategoriesService)
  constructor(private route:Router){}

 
  ngOnInit(){
    this.loadscategories()
    }
    
    loadscategories(){
      this.tabscat=this.scategorieService.getScategories();
      
      
    }

 AjoutArticle(){ 
   
    this.articleService.createArticle(this.art())
   this.route.navigate(['/afficharticles'])
   
  }
  annuler(){
   this.route.navigate(['/afficharticles'])
  }
}
