import { Injectable } from '@angular/core';
import { ShufflePipe } from './shuffle.pipe'

import { Album } from "./album";
import { List } from "./list";

import { ALBUMS, ALBUM_LISTS } from "./mock-albums";

import { Subject } from 'rxjs';

type Order = (a: Album, b: Album) => number;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  albums: Album[] = ALBUMS;
  albumLists: List[] = ALBUM_LISTS;
  defaultOrder: Order = (a, b) => a.duration - b.duration;

  sendCurrentNumberPage = new Subject<number>();

  constructor(private shuffleData: ShufflePipe) { }

  getAlbums(order: Order = (a,b) => (a.duration - b.duration)): Album[] {
    return this.albums.sort(order);
  }

  countAlbums(): number {
    return this.albums.length;
  }

  getAlbum(id: string): Album {
    return this.albums.find(album => album.id === id);
  }

  getAlbumList(id: string): List {
    return this.albumLists.find(albumList => albumList.id === id);
  }

  initStatus() {
    this.albums = this.albums.map(album => {
      album.status = "off";
      return album;
    });
  }

  paginate(start: number, end: number, order: Order = this.defaultOrder): Album[] {
    return this.albums.sort(order).slice(start, end);
  }

  search(word: string): Album[] {
    return this.albums.filter(album =>  album.title.includes(word));
  }

  setAlbums(albums: Album[]) {
    this.albums = albums;
  }

  shuffle(data: any[]) {
    return this.shuffleData.transform(data);
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }
}
