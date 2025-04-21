import { Injectable } from '@angular/core';
import {Produit} from "../model/produit.model";
import {Categorie} from "../model/categorie.models";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {CategorieWrapper} from "../model/categorieWrapped.model";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {



  produits? : Produit[];
  categories? : Categorie[];


  constructor(private http : HttpClient) {
   /* this.categories = [
      {idCat : 1, nomCat : "PC"},
      {idCat : 2, nomCat : "Imprimante"}
    ];
    this.produits = [
      {idProduit : 1, nomProduit : "PC Asus", prixProduit : 3000.600, dateCreation : new Date("01/14/2011"),categorie : {idCat : 1, nomCat : "PC"}},
      {idProduit : 2, nomProduit : "Imprimante Epson", prixProduit : 450, dateCreation : new Date("12/17/2010"), categorie: {idCat : 2, nomCat : "Imprimante"}},
      {idProduit : 3, nomProduit :"Tablette Samsung", prixProduit : 900.123, dateCreation : new Date("02/20/2020"),categorie : {idCat : 1, nomCat : "PC"}}
    ];*/
  }



  listeProduit(): Observable<Produit[]>{
    return this.http.get<Produit[]>(environment.apiURL);
  }

  ajouterProduit( prod: Produit):Observable<Produit>{
    return this.http.post<Produit>(environment.apiURL, prod, httpOptions);
  }

  supprimerProduit(id : number) {
    const url = `${environment.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${environment.apiURL}/${id}`;
    return this.http.get<Produit>(url);
  }

  updateProduit(prod :Produit) : Observable<Produit>
  {
    return this.http.put<Produit>(environment.apiURL, prod, httpOptions);
  }

  /*listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(environment.apiURL+"/cat");
  }*/
  listeCategories():Observable<CategorieWrapper>{
    return this.http.get<CategorieWrapper>(environment.apiURLCat);
  }

  rechercherParCategorie(idCat: number):Observable< Produit[]> {
    const url = `${environment.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string):Observable< Produit[]> {
    const url = `${environment.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie( cat: Categorie):Observable<Categorie>{
    const newCat = { ...cat };
    if(cat.idCat == 0){
      delete (newCat as any).idCat;
    }

    return this.http.post<Categorie>(environment.apiURLCat, newCat, httpOptions);
  }
}
