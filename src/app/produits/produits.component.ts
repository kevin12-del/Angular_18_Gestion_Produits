import {Component, OnInit} from '@angular/core';
import {Produit} from "../model/produit.model";
import {CommonModule} from "@angular/common";
import {ProduitService} from "../services/produit.service";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit{

    produits? : Produit[];

  constructor(private produitService : ProduitService,
              public authService: AuthService) {

  }

  ngOnInit(): void {
    //this.produits = this.produitService.listeProduit();
    this.chargerProduits();
  }

  chargerProduits(){
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }

  supprimerProduit(p: Produit)
  {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
        console.log("produit supprimé");
        this.chargerProduits();
      });
  }
}
