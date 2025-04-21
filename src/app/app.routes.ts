import { Routes } from '@angular/router';
import {ProduitsComponent} from "./produits/produits.component";
import {AddProduitComponent} from "./add-produit/add-produit.component";
import {UpdateProduitComponent} from "./update-produit/update-produit.component";
import {RechercheParCategorieComponent} from "./recherche-par-categorie/recherche-par-categorie.component";
import {RechercheParNomComponent} from "./recherche-par-nom/recherche-par-nom.component";
import {ListeCategoriesComponent} from "./liste-categories/liste-categories.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {produitGuard} from "./produit.guard";

export const routes: Routes = [
  {path: "add-produit", component : AddProduitComponent, canActivate:[produitGuard]},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "listeCategories", component : ListeCategoriesComponent},
  {path: 'login', component: LoginComponent},
  {path: "produits", component : ProduitsComponent},
  {path: "rechercheParCategorie", component : RechercheParCategorieComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "updateProduit/:id", component: UpdateProduitComponent},
  {path: "", redirectTo: "produits", pathMatch: "full"}
];
