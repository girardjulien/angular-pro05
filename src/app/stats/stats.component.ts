import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Album } from "../album";

import { ALBUMS } from "../mock-albums";
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  titlePage: string = "Page statistiques Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum: Album;
  isSearch: boolean = false;
  albumPerPage: number = 4;

  moyenne: number;

  start: number = 0;
  end: number = 4;
  filtre = (a, b) => this.albumS.getMoyenne(b.id) - this.albumS.getMoyenne(a.id);

  constructor(private albumS: AlbumService) {}

  ngOnInit() {
    this.albums = this.albumS.paginate(this.start, this.end, this.filtre);
  }

  onSelect(album: Album) {
    this.selectedAlbum = { ...album};
  }

  croissant() {
    this.filtre = (a, b) => this.albumS.getMoyenne(a.id) - this.albumS.getMoyenne(b.id);
    this.albums = this.albumS.paginateStats(this.start, this.end, this.filtre);
  }

  decroissant() {
    this.filtre = (a, b) => this.albumS.getMoyenne(b.id) - this.albumS.getMoyenne(a.id);
    this.albums = this.albumS.paginateStats(this.start, this.end, this.filtre);
  }

  paginate($event: {start: number, end: number}) {
    this.start = $event.start;
    this.end = $event.end;
    this.albums = this.albumS.paginate($event.start, $event.end, this.filtre);
  }

}
