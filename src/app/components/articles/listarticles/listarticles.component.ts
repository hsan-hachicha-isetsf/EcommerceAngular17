import { Component, inject, signal } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';
import { Article } from '../../../classes/article';
import { RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listarticles',
  standalone: true,
  imports: [RouterLink,DataTablesModule],
  templateUrl: './listarticles.component.html',
  styleUrl: './listarticles.component.css'
})
export class ListarticlesComponent {
  public articleservice = inject(ArticlesService);
  dtTrigger: Subject<any> = new Subject();
  articles = signal<Article[]>([]);

   
 ngOnInit(): void {
   this.articles=this.articleservice.getArticles()
   this.dtTrigger.next; // Trigger DataTables to refresh
 }


 deleteArticle(article:Article):void {
  this.articleservice.deleteArticle(article)
}

}
