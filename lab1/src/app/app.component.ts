import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cheapWisdom = 'Cheap wisdom is expensive';
  n ?: number;
  hateList ?: string[];
  child : Child;
  nft : NFT[];
  desc ?: string;
  price ?: number;

  addNFT() : void {
    if (this.desc != undefined && this.price != undefined) {
      this.nft.push(new NFT(this.desc, this.price));
    }
  }
  
  removeNFT() : void {
    this.nft.pop();
  }

  constructor() {
    this.n = 13;
    this.hateList = ['Spiders', 'Snakes', 'Stupid People'];
    this.child = new Child('John', 12);
    this.nft = [new NFT('A picture of a cat', 100), new NFT('A picture of a dog', 200), new NFT('A picture of a bird', 300)];
  }

}

class Child{
  constructor(public name: string, public age: number) {}

  goToSchool() {
    return "Oups ! Il y a eu une éclosion à l’école. " + this.name + " doit revenir à la maison pour 2 semaines."
  }
}

class NFT{
  constructor(public desc: string, public price: number) {}
}