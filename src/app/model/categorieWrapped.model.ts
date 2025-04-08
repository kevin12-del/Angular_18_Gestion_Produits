import { Categorie } from './categorie.models';
export class CategorieWrapper{
  _embedded!: { categories: Categorie[]};
}
