import { Song } from './Song';

export class Album {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public songs: Song[] = []
  ) {}
}
