import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Produit} from "../model/produit.model";
import {ProduitService} from "../services/produit.service";
import {Categorie} from "../model/categorie.models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit{

  newProduit = new Produit();
  categories! : Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;

  message? : string;
  constructor(private  produitService : ProduitService,
              private router : Router) {

  }

  ngOnInit(): void {
        // Add initialization logic here if needed
    this.produitService.listeCategories().subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }

  addProduit(){
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit)
      .subscribe(prod => {
        console.log(prod);
        this.router.navigate(['produits']);
      });
  }
}
