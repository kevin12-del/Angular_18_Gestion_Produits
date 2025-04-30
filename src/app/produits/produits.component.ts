import {Component, OnInit} from '@angular/core';
import {Produit} from "../model/produit.model";
import {CommonModule} from "@angular/common";
import {ProduitService} from "../services/produit.service";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Image} from "../model/Image.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";


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
    apiURL: string = 'http://localhost:8080/produits/api';
   //private imageUrl: string;

  constructor(private produitService : ProduitService,
              public authService: AuthService, private http : HttpClient) {

  }

  ngOnInit(): void {
    //this.produits = this.produitService.listeProduit();
    this.chargerProduits();
  }

  chargerProduits(){
    /*this.produitService.listeProduit().subscribe(prods => {
      this.produits = prods;
      this.produits.forEach((prod) => {
        this.produitService
          .loadImage(prod.image.idImage)
          .subscribe((img: Image) => {
            prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
          });
      });
    });*/
    this.produitService.listeProduit().subscribe(prods => {
      this.produits = prods;
      this.produits.forEach((prod) => {
        /*prod.imageStr = 'data:' + prod.images[0].type + ';base64,' +
          prod.images[0].image;*/
        this.produitService.loadImageBlob(prod.idProduit).subscribe(blob => {
          // Crée une URL utilisable dans le src de l’<img>
          const url = URL.createObjectURL(blob);
          prod.imageStr = url;
        });
      });
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

  protected readonly environment = environment;
}
