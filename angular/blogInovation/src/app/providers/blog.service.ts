// Usado para decorar os serviços Angular
import { Injectable } from '@angular/core';

// Importa lodash como _ (Comando NPM: npm i --save-dev @types/lodash)
import * as _ from 'lodash';

// Usado para navegar entre rotas
import { Router } from '@angular/router';

// Usado para requisições GET, POST, etc. (Comando NPM: npm i --save http-client)
import { HttpClient } from '@angular/common/http';


// Declara uma constante base URL
const baseURL = window.location.href;

// Decora a classe BlogService para ser "injetável" dentro do Angular
@Injectable()

// Exporta nossa classe para ser entendida por outros arquivos
export class BlogService {

// Declara uma variável de escopo global na classe, com a URL do serviço externo que iremos consumir. Por exemplo: podemos copiar está URL no nosso navegador.
  getURL: string = 'https://jsonplaceholder.typicode.com/posts'

  constructor(
    public http: HttpClient, // Injeta o serviço http do Angular
    public router: Router // Injeta o serviço do Router do Angular
  ) { }


// Pegar a lista de posts

posts() {

// Retorna uma setença que quando resolvida irá conter a lista de posts
  return new Promise((resolve, reject) =>  {

    // Utiliza o metódo GET do http que injetamos mais acima, passando como opção a URL que irá conter nossos posts. Poderia ser qualquer serviço externo que devolve uma lista no formato JSON
      this.http.get(this.getURL).subscribe((data: any) => {

        // Declara uma variável local POSTS
        let posts = JSON.parse(data._body);

        // Loop nos posts para criar uma propriedade extra
        posts.map((post:any, i:any) => {
          // Título no formato de slug
          posts[i].titleSlug = _.kebabCase(post.title);

          // Rota deste post
          posts[i].router = '/' + posts[i].titleSlug + '/' + posts[i].id;

          // URL deste post
          posts[i].url = baseURL + posts[i].router;
        });
        resolve(posts); // Resolva a lista de posts
      }, (err) => {
        reject(err); // Rejeita a setença com erro
      });
      })
  }
  // Pegar um post específico, passando como parâmetro o ID do post
  post(id: any) {
    return new Promise((resolve, reject) => {
      // Pegamos a lista de posts
      this.posts().then((posts: any[any]) => {
        // Filtramos procurando pelo post específico
        let post = _.find(posts, (p) => {
          return p.id == id;
        });
        // Se tiver post resolve, senão, Rejeita com error page 404
        return post ? resolve(post) : reject('post not found)');
      });
    })
  }
}
