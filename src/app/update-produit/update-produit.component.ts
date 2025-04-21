import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../services/produit.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Produit} from "../model/produit.model";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Categorie} from "../model/categorie.models";

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './update-produit.component.html',
  styles: ``
})
export class UpdateProduitComponent implements OnInit{
  currentProduit= new Produit();
  categories! : Categorie[];
  updatedCatId! : number;

  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private produitService: ProduitService) {
  }
  ngOnInit(): void {
        // Initialization logic here
    this.produitService.listeCategories().
    subscribe(cats => {this.categories = cats._embedded.categories;
      console.log(cats);
    });
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentProduit = prod;
      this.updatedCatId =
        this.currentProduit.categorie?.idCat || 0;
    } ) ;

    }

  updateProduit() {
    this.currentProduit.categorie = this.categories.find(cat => cat.idCat == this.updatedCatId)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(prod => {
      this.router.navigate(['produits']); }
    );
  }

}
