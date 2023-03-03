import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

const youtubeURL = "https://www.youtube.com/embed/";

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  constructor (private sanitizer: DomSanitizer) {}

  transform(url: string | SafeValue | null) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.sanitizer.sanitize(SecurityContext.URL, url) ?? "");
  };

  // Je l'appelle pas, car le pipe cause des problèmes donc je ne l'utilise pas
}
