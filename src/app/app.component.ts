import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TP2';
  language : string = "fr";
  
  constructor(public translator : TranslateService) {
    translator.setDefaultLang(this.language);
   }

  changeLanguage(language : string) : void {
    this.language = language;
    this.translator.use(this.language);
  }
}
