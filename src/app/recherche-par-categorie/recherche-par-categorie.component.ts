import {Component, OnInit} from '@angular/core';
import {Produit} from "../model/produit.model";
import {Categorie} from "../model/categorie.models";
import {ProduitService} from "../services/produit.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-recherche-par-categorie',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './recherche-par-categorie.component.html',
  styles: ``
})
export class RechercheParCategorieComponent implements OnInit{


  produits! : Produit[];
  IdCategorie! : number;
  categories! : Categorie[];
  constructor(private produitService : ProduitService) {
  }

  ngOnInit(): void {
    // Initialisation logic here if needed
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  onChange(){
    this.produitService.rechercherParCategorie(this.IdCategorie).
    subscribe(prods =>{this.produits=prods});
  }
}
