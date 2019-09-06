import { Component, OnInit } from '@angular/core';

import { Album } from "../album";

import { ALBUMS } from "../mock-albums";
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  providers: [ AlbumService ]
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page princpale Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum: Album;
  isSearch: boolean = false;
  albumPerPage: number = 3;

  constructor(private albumS: AlbumService) {}

  ngOnInit() {
    this.albums = this.albumS.paginate(0,3, (a, b) => b.duration - a.duration);
  }

  onSelect(album: Album) {
    this.selectedAlbum = { ...album};
  }

  playParent($event: Album) {
    this.albums = ALBUMS.map(album => {
      if (album.id == $event.id) {
        album.status = "on";
        return album;
      } else {
        album.status = "off";
        return album;
      }
    });
  }

  searchParent($event: Album[]) {
    this.albums = $event;
    this.isSearch = true;
  }

  reload() {
    this.albums = this.albumS.paginate(0, this.albumPerPage);
    this.isSearch = false;
  }

  reloadParent($event: boolean) {
    this.isSearch = false;
    this.albums = this.albumS.paginate(0, this.albumPerPage);
  }

  paginate($event: {start: number, end: number}) {
    this.albums = this.albumS.paginate($event.start, $event.end, (a, b) => b.duration - a.duration);
  }

}
