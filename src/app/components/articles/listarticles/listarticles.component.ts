import { Component, inject, signal } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ArticlesService } from '../../../services/articles.service';
import { Article } from '../../../classes/article';
import { RouterLink } from '@angular/router';
import { AjoutarticleComponent } from '../ajoutarticle/ajoutarticle.component';
import {articles} from '../../../store/store.signal'


@Component({
  selector: 'app-listarticles',
  standalone: true,
  imports: [RouterLink,DataTablesModule,AjoutarticleComponent],
  templateUrl: './listarticles.component.html',
  styleUrl: './listarticles.component.css'
})
export class ListarticlesComponent {
  public articleservice = inject(ArticlesService);

  articles = signal<Article[]>([]);

   
 ngOnInit(): void {
   this.articleservice.getArticles()
   this.articles=articles

 }


 deleteArticle(article:Article):void {
  this.articleservice.deleteArticle(article)
}


}
