import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Produit} from "../model/produit.model";
import {ProduitService} from "../services/produit.service";
import {SearchFilterPipe} from "../search-filter.pipe";

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SearchFilterPipe
  ],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit{

  produits! : Produit[];
  nomProduit!: string;
  private allProduits!: Produit[];
  searchTerm!: string;

  constructor(private produitService: ProduitService) {
  }
  ngOnInit(): void {
        // Add initialization logic here if needed
    //this.produits = [];
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  }

  rechercherProds(){
    if(this.nomProduit) //(this.nomProduit!=="")
    {
      this.produitService.rechercherParNom(this.nomProduit).subscribe(prods => {
        console.log(prods);
        this.produits=prods;});
    }else{
      this.produitService.listeProduit().subscribe(prods => {
        console.log(prods);
        this.produits = prods;
      });
    }
    }


  onKeyUp(filterText: string) {
    this.produits = this.allProduits.filter(item =>
      item.nomProduit.toLowerCase().includes(filterText));

  }
}
