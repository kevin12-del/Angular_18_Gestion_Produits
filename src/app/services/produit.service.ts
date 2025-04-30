import { Injectable } from '@angular/core';
import {Produit} from "../model/produit.model";
import {Categorie} from "../model/categorie.models";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {CategorieWrapper} from "../model/categorieWrapped.model";
import {AuthService} from "./auth.service";
import {Image} from "../model/Image.model";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {



  produits? : Produit[];
  categories? : Categorie[];


  constructor(private http : HttpClient, private authService: AuthService) {
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
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Produit[]>(environment.apiURL+"/all",{headers:httpHeaders});*/
    return this.http.get<Produit[]>(environment.apiURL+"/all");
  }

  ajouterProduit( prod: Produit):Observable<Produit>{
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Produit>(environment.apiURL+ "/addprod", prod, {headers:httpHeaders});*/
    return this.http.post<Produit>(environment.apiURL+ "/addprod", prod);
  }

  supprimerProduit(id : number) {
    const url = `${environment.apiURL}/delprod/${id}`;
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});*/
    return this.http.delete(url);

  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${environment.apiURL}/getbyid/${id}`;
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Produit>(url,{headers:httpHeaders});*/
    return this.http.get<Produit>(url);
  }

  updateProduit(prod :Produit) : Observable<Produit>
  {
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Produit>(environment.apiURL+"/updateprod", prod, {headers:httpHeaders});*/
    return this.http.put<Produit>(environment.apiURL+"/updateprod", prod);
  }

  /*listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(environment.apiURL+"/cat");
  }*/
  listeCategories():Observable<CategorieWrapper>{
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<CategorieWrapper>(environment.apiURLCat, {headers:httpHeaders});*/
    return this.http.get<CategorieWrapper>(environment.apiURLCat);
  }

  rechercherParCategorie(idCat: number):Observable< Produit[]> {
    const url = `${environment.apiURL}/prodscat/${idCat}`;
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Produit[]>(url,{headers:httpHeaders});*/
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string):Observable< Produit[]> {
    /*const url = `${environment.apiURL}/prodsByName/${nom}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<Produit[]>(url,{headers:httpHeaders});*/
    return this.http.get<Produit[]>(`${environment.apiURL}/prodsByName/${nom}`);
  }

  ajouterCategorie( cat: Categorie):Observable<Categorie>{
    const newCat = { ...cat };
    /*let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});*/
    if(cat.idCat == 0){
      delete (newCat as any).idCat;
    }

    //return this.http.post<Categorie>(environment.apiURLCat, newCat, {headers:httpHeaders});
    return this.http.post<Categorie>(environment.apiURLCat, newCat);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${environment.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(file: File, filename: string, idProd:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.apiURL + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

  uploadImageFS(file: File, filename: string, idProd : number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id : number) {
    const url = `${environment.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }



  loadImageBlob(idProduit: number): Observable<Blob> {
    return this.http.get(
      `${environment.apiURL}/image/loadfromFS/${idProduit}`,
      { responseType: 'blob' }
    );
  }
}
