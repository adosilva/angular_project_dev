// Usado para decorar os serviços Angular
import { Injectable } from '@angular/core';

// Importa lodash como _ (Comando NPM: npm i --save-dev @types/lodash)
import * as _ from 'lodash';

// Usado para navegar entre rotas
import { Router } from '@angular/router';

// Usado para requisições GET, POST, etc. (Comando NPM: npm i --save http-client)
import { HttpClientModule } from '@angular/common/http';


// Declara uma constante base URL
const baseURL = window.location.href;

// Decora a classe BlogService para ser "injetável" dentro do Angular
@Injectable()

// Exporta nossa classe para ser entendida por outros arquivos
export class BlogService {

// Declara uma variável de escopo global na classe, com a URL do serviço externo que iremos consumir. Por exemplo: podemos copiar está URL no nosso navegador.
  getURL: string = 'https://jsonplaceholder.typicode.com/posts'

  constructor(
    public http: HttpClientModule, // Injeta o serviço http do Angular
    public router: Router // Injeta o serviço do Router do Angular
  ) { }
}

// Pegar a lista de posts
