import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Categorie} from "../model/categorie.models";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-update-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-categorie.component.html',
  styles: ``
})
export class UpdateCategorieComponent implements OnInit{

  @Input()
  categorie! : Categorie;

  @Input()
  ajout!:boolean;

  @Output()
  categorieUpdated = new EventEmitter<Categorie>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.categorie);
  }
  saveCategorie(){
    this.categorieUpdated.emit(this.categorie);
  }
}
