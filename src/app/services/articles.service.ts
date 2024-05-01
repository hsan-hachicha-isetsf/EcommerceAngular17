import { Injectable,inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../classes/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  public http = inject(HttpClient);
  public url = 'http://localhost:3001/api/articles';
  articles = signal<Article[]>([]);
  constructor() { }
    getArticles(){
      this.http.get<Article[]>(this.url).subscribe(data => { 
     this.articles.set(data);
   })
      
    return this.articles;
   
  }

  deleteArticle(article: Article) {
    this.http.delete<Article>(this.url + '/' + article._id)
    .subscribe(data => {
     
      return this.articles.update(articles => articles.filter(art => art._id !== article._id));
    })
    
  }
  
    createArticle(article: Article) {
      return this.http.post(this.url+'/' , article).subscribe(((data: any)=>{
          
        this.articles.set([...this.articles(), article]);
        }))
      }
  
      updateArticle(article: Article) {
        this.http.put(this.url+ '/' + article._id, article)
        .subscribe(data => {
         
        return this.articles.update(articles => {
          const index = articles.findIndex(a => a._id === article._id);
          articles[index] = article;
          return articles;
        });
      })
      }

      findArticle(_id:object | undefined) {

        return this.http.get(this.url + '/' +  _id)
           }
     
}
