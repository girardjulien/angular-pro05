import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShufflePipe } from '../shuffle.pipe';
import { Album } from '../album';
import { List } from '../list';
import { AlbumService } from '../album.service';
import {trigger,state,style,animate,transition} from'@angular/animations';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
  animations: [ 
    trigger('myAnimation', [
      // définir l'état open de l'élément HTML
      state('open', style({
        height:'100px',
        opacity: 1,
        backgroundColor:'green'
      })),
      // définir l'état close de l'élément HTML
      state('close', style({
        height:'100px',
        opacity: 0.25,
        backgroundColor:'yellow'
      })),
      transition('open => close', [
        animate('2s')
      ]),
    ])
  ]
})
export class AlbumDetailsComponent implements OnInit {

  @Input() album: Album;
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();
  hideAlbum: boolean = true;
  songs: string[];

  constructor(private albumS: AlbumService) {}

  ngOnInit() {
    console.log(this.album);
  }

  ngOnChanges() {
    if (this.album) {
      this.hideAlbum = false;
      const list: List = this.albumS.getAlbumList(this.album.id);
      this.songs = list ? list.list : [];
    }
  }

  play(album: Album) {
    this.onPlay.emit(album);
  }

  hide() {
    this.hideAlbum = true;
    this.albumS.initStatus();
  }

  shuffle() {
    if (this.songs) {
      this.songs = this.albumS.shuffle( this.songs );
    }
  }

}
