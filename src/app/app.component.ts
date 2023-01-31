import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Deux variables devront être ajoutées ici
  result = false;

  // Le constructeur devra être ajouté ici

  searchArtist():void{
    this.result = true;
	
	// La requête HTTP devra être ajoutée ici
	
  }

  newSearch():void{
    this.result = false;
  }
}
