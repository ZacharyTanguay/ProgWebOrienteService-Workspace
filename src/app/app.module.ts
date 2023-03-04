import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { ShowComponent } from './show/show.component';
import { SongComponent } from './song/song.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { YoutubePipe } from './pipe/youtube.pipe';

@NgModule({
  declarations: [	
    AppComponent,
    ArtistComponent,
    AlbumComponent,
    ShowComponent,
    SongComponent,
    YoutubePipe,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    RouterModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/artist', pathMatch: 'full' },
      { path: 'artist', component: ArtistComponent },
      { path: 'album/:artistId', component: AlbumComponent },
      { path: 'show/:artistName', component: ShowComponent },
      { path: 'song/:artistId/:albumName/:artistName', component: SongComponent },
    ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
