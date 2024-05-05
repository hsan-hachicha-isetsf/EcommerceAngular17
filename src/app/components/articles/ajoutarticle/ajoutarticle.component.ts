import { Component, Input, inject, signal } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { Article } from '../../../classes/article';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Scategorie } from '../../../classes/scategorie';

import { ScategoriesService } from '../../../services/scategories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajoutarticle',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './ajoutarticle.component.html',
  styleUrl: './ajoutarticle.component.css'
})
export class AjoutarticleComponent {
  display = "none";
  art=signal<Article>({})

  tabscat=signal<Scategorie[]>([])
  public articleService = inject(ArticlesService);
  scategorieService=inject(ScategoriesService)


 
  ngOnInit(){
    this.loadscategories()
    }
    
    loadscategories(){
      this.tabscat=this.scategorieService.getScategories();
      
      
    }

 AjoutArticle(){ 
   
    this.articleService.createArticle(this.art())
    this.display = "none";

   
  }
  annuler(){
    this.display = "none";
 this.art.set({});
  }
  openModal() { 
    this.display = "block";
}

closeModal() {
  this.display = "none";
  this.art.set({});
}

}
