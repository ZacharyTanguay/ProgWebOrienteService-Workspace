import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { ShowComponent } from './show/show.component';
import { SongComponent } from './song/song.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    AlbumComponent,
    ShowComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot([
      { path: '', component: ArtistComponent },
      { path: 'artist', component: ArtistComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'show', component: ShowComponent },
      { path: 'song', component: SongComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
